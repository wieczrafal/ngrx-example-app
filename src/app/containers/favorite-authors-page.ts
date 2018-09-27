import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as author from '../actions/author';
import * as fromRoot from '../reducers';

@Component({
    selector: 'bc-favorite-authors',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <md-card>
        <md-card-title>Favorite Authors</md-card-title>
    </md-card>
    <md-spinner *ngIf="loading$ | async"></md-spinner>

    <bc-author-list (remove)="remove($event)" [authors]="authors$ | async"></bc-author-list>
    `
})
export class FavoriteAuthorsComponent {
    public authors$: Observable<string[]>;
    public loading$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) {
        this.authors$ = store.select(fromRoot.getAuthors);
        this.loading$ = store.select(fromRoot.getAuthorLoading);
    }

    public remove(auth: string) {
        this.store.dispatch(new author.RemoveAuthorAction(auth));
    }
}
