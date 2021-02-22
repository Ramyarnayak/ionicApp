import { Directive, ElementRef, Input } from '@angular/core';
/**
 * `<div appTextHighlight content="Lorem ipsum dolor sit amet" searchTerm="ipsum"></div>`
 */
@Directive({
  selector: '[appTextHighlight]'
})
export class TextHighlightDirective {

  // tslint:disable-next-line: variable-name
  private _searchTerm: string;

  @Input() content: string;

  @Input('searchTerm')
  set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
    this.highlight();
  }
  get searchTerm(): string { return this._searchTerm; }

  constructor(private el: ElementRef) { }

  highlight(): void {

    let finalText: string = '';
    const searchPattern: RegExp = new RegExp(this._searchTerm, 'i');
    const matchpattern: RegExp = new RegExp(this._searchTerm, 'gi');

    if (this._searchTerm === undefined || this._searchTerm === null || this._searchTerm.length < 1 || this._searchTerm[0] === '.') {
      this.el.nativeElement.innerText = this.content;
      return;
    }

    const separatedText: Array<string> = this.content.split(searchPattern);
    const separatedSearchedText: Array<string> = this.content.match(matchpattern);

    if (separatedSearchedText !== null && separatedSearchedText.length > 0) {
      for (let i: number = 0; i < separatedText.length; i++) {
        if (i <= separatedSearchedText.length - 1) {
          finalText += `${separatedText[i]}<span class="textHighlight-bold">${separatedSearchedText[i]}</span>`;
        } else {
          finalText += separatedText[i];
        }
      }
    }

    if (finalText.length > 0) {
      this.el.nativeElement.innerHTML = finalText;
    } else {
      this.el.nativeElement.innerText = this.content;
    }

  }
}
