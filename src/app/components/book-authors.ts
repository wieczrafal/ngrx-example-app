import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Book } from '../models/book';


@Component({
  selector: 'bc-book-authors',
  template: `
    <h5 md-subheader>Written By:</h5>
    <span>
      {{ authors | bcAddCommas }}
    </span>
    <md-icon (click)="toggleFavoriteAuthor()">star_border</md-icon>
  `,
  styles: [`
    h5 {
      margin-bottom: 5px;
    }
  `]
})
export class BookAuthorsComponent {
  @Input() book: Book;
  @Output() addAuthor = new EventEmitter<string>();
  @Output() removeAuthor = new EventEmitter<string>();

  get authors() {
    return this.book.volumeInfo.authors;
  }

  public toggleFavoriteAuthor(): void {
    this.addAuthor.emit(this.authors[0]);
  }
}
