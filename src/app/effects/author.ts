import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { delay } from "rxjs/operators";
import { map } from "rxjs/operators";

import * as author from '../actions/author';

@Injectable()
export class AuthorEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadAuthors$: Observable<Action> = this.actions$
    .ofType(author.LOAD)
    .startWith(new author.LoadAction())
    .switchMap(() =>
      this.getAuthors()
        .map((authors: string[]) => new author.LoadSuccessAction(authors))
        .catch(error => of(new author.LoadFailAction(error)))
    );

  @Effect()
  addAuthorToCollection$: Observable<Action> = this.actions$
    .ofType(author.ADD_AUTHOR)
    .map((action: author.AddAuthorAction) => action.payload)
    .mergeMap(auth =>
      this.addAuthor(auth)
        .map(() => new author.AddAuthorSuccessAction(auth))
        .catch(() => of(new author.AddAuthorFailAction(auth)))
    );


  @Effect()
  removeAuthorFromCollection$: Observable<Action> = this.actions$
    .ofType(author.REMOVE_AUTHOR)
    .map((action: author.RemoveAuthorAction) => action.payload)
    .mergeMap(auth =>
      this.removeAuthor(auth)
        .map(() => new author.RemoveAuthorSuccessAction(auth))
        .catch(() => of(new author.RemoveAuthorFailAction(auth)))
    );

    constructor(private actions$: Actions, private db: Database) { }

    private getAuthorsSync(): string[] {
      return JSON.parse(localStorage.getItem('authors')) || [];
    }

    private getAuthors(): Observable<string[]> {
      return of(this.getAuthorsSync()).pipe(
        delay(this.getRandomDelay())
      );
    }

    private addAuthor(author: string) {
      localStorage.setItem('authors', JSON.stringify(this.getAuthorsSync().concat(author)));
      return of(author).pipe(
        delay(this.getRandomDelay())
      );
    }

    private removeAuthor(author: string) {
      localStorage.setItem('authors', JSON.stringify(this.getAuthorsSync().filter(auth => auth !== author)));
      return of(author).pipe(
        delay(this.getRandomDelay())
      );
    }

    private getRandomDelay(): number {
      return Math.floor(Math.random() * 2000) + 500;
    }
}
