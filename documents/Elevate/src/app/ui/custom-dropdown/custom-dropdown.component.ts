import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppFormData } from 'src/app/content/home/models/app-form-data.model';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {

  // array of available options
  @Input() listItem: Array<AppFormData>;

  @Input() defaultSelectedItem: AppFormData;

  @Input() keyMapper: string = 'id';

  @Input() boxStyle: NgStyle;

  @Input() placeholder: string = 'Select an option';

  @Output() dropdownOptionSelected: EventEmitter<AppFormData> = new EventEmitter<AppFormData>();

  open: boolean = false;

  selectedItem: AppFormData;

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = this.defaultSelectedItem;
  }

  get unSelectedItems(): Array<AppFormData> {
    return this.selectedItem
      ? this.listItem
        .filter(
          (item: AppFormData) =>
            item[this.keyMapper] !== this.selectedItem[this.keyMapper]
        )
      : this.listItem;
  }

  onClickItem(newItem: AppFormData): void {
    if (!newItem) {
      return;
    }
    this.selectedItem = newItem;
    this.dropdownOptionSelected.emit(this.selectedItem);
    this.open = false;
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1 && !this.open) {
      this.open = true;
    }
  }

}
