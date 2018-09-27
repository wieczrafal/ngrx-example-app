import { Routes } from '@angular/router';

import { CollectionPageComponent } from './containers/collection-page';
import { FavoriteAuthorsComponent } from './containers/favorite-authors-page';
import { FindBookPageComponent } from './containers/find-book-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { BookExistsGuard } from './guards/book-exists';

export const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },
  {
    path: 'book/find',
    component: FindBookPageComponent
  },
  {
    path: 'book/:id',
    canActivate: [ BookExistsGuard ],
    component: ViewBookPageComponent
  },
  {
    path: 'favoriteAuthors',
    component: FavoriteAuthorsComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
