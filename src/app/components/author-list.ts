import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bc-author-list',
  template: `
    <md-card *ngFor="let author of authors">
      <md-card-title-group>
        <md-card-title>{{ author }}<md-icon (click)="remove.emit(author)">close</md-icon></md-card-title>
      </md-card-title-group>
    </md-card>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    md-card {
      margin: 20px;
    }
  `]
})
export class AuthorListComponent {
  @Input() authors: string[];
  @Output() remove = new EventEmitter<string>();
}
