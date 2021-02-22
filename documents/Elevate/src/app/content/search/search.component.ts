import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { MessageService } from 'src/app/services/message.service';
import { AppFormData } from '../home/models/app-form-data.model';
import { SearchCategories } from './models/search-categories.model';
import { SearchCategory } from './models/search-category.model';
import { SearchPage } from './models/search-page.model';
import { SearchResultData } from './models/search-result-data.model';
import { SearchResult } from './models/search-result.model';
import { SearchCommonService } from './services/search-common.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  categoryFilterList: Array<AppFormData>;

  // Total number of search results
  countFound: number = 0;

  currentPage: number = 1;

  isLoading: boolean = false;

  toggleFilter: boolean = false;

  totalPage: number = 1;

  searchPageContent: Observable<SearchPage>;

  searchResults: Observable<Array<SearchResultData>>;

  searchString: string;

  readonly postPerPage: number = 10;

  constructor(
    private searchCommonService: SearchCommonService,
    private searchSerivce: SearchService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.messageService.getMessage()
      .subscribe((message: { text: string, value: string }) => {
        switch (message.text) {
          case 'searchString':
            this.searchString = message.value;
            this.getSearchResult();
            break;
          default: return;
        }
      });
  }

  ngOnInit(): void {
    this.searchPageContent = this.searchCommonService.searchPageContent
      .pipe(
        tap(
          (searchPageContent: SearchPage) =>
            this.setCategoryFilterList(searchPageContent?.searchcategories[0]))
      );
  }

  currentPageNumber(): number {
    let page;
    if (this.currentPage === 1) {
      page = this.currentPage + 1;
    } else {
      page = this.currentPage;
    }
    if (this.totalPage === 1) {
      page = "";
    }
    if (this.totalPage === this.currentPage && this.currentPage >= 4) {
      page = this.totalPage - 1;
    }
    return page
  }

  gotoPrevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  gotoNextPage(): void {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
    }
  }

  nextPageNumber(): number {
    let page;
    if (this.currentPage === 1) {
      page = this.currentPage + 2;
      if (this.currentPage === this.totalPage) {
        page = "";
      }
    } else if (this.currentPage === this.totalPage) {
      page = this.currentPage;
      if (this.totalPage === 3) {
        page = "";
      }
    } else {
      page = this.currentPage + 1;
    }
    if (this.totalPage === 2) {
      page = "";
    }
    return page
  }

  onCardClick(result: SearchResultData): void {
    const link: string = result?.searchNavigation?.url || result?.navigation?.link?.internalLink;
    if (link) {
      this.router.navigateByUrl(link);
    }
  }

  getSearchResult(resetPagination: boolean = false): void {
    this.isLoading = true;
    if (resetPagination) {
      this.resetPagination();
    }
    this.searchResults = this.searchSerivce
      .search(this.searchString, this.selectedCategoryValueList())
      .pipe(
        map((result: SearchResult) => result.data
          .filter((data: SearchResultData) => data.searchNavigation?.url || data.navigation?.link?.internalLink)
        ),
        tap((resultData: Array<SearchResultData>) => {
          this.countFound = resultData?.length;
          this.totalPage = Math.ceil(this.countFound / this.postPerPage);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      );
  }

  prevPageNumber(): number {
    let page;
    if (this.currentPage === 1) {
      page = this.currentPage;
    } else {
      page = this.currentPage - 1;
    }
    if (this.totalPage === this.currentPage && this.currentPage >= 4) {
      page = this.totalPage - 2;
    }
    return page
  }

  resetCategoryFilter(): void {
    this.categoryFilterList
      ?.map((item: AppFormData) => item.checked = this.isAllResults(item.value));
  }

  setCurrentPage(num: string | number): void {
    if (num) {
      this.currentPage = +num;
    }
  }

  selectedCategoryValueList(): Array<string> {
    return this.categoryFilterList
      .map((category: AppFormData) => {
        if (category.checked) {
          return category.value;
        }
      });
  }

  toggleFilterSheet(): void {
    this.toggleFilter = !this.toggleFilter;
  }

  trackByRecordId(record: SearchResultData): string {
    return record?.id;
  }

  get endIndex(): number {
    return this.currentPage * this.postPerPage;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.postPerPage;
  }

  private isAllResults(categoryValue: string): boolean {
    return categoryValue === 'all_results';
  }

  private resetPagination(): void {
    this.currentPage = 1;
  }

  private setCategoryFilterList(searchcategories: SearchCategories): void {
    this.categoryFilterList = searchcategories?.categories
      ?.map((item: SearchCategory) => {
        return {
          label: item.category.label,
          value: item.category.value,
          checked: this.isAllResults(item.category.value)
        };
      });
  }

}
