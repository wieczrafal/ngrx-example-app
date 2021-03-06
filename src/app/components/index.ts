import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../pipes';
import { AuthorListComponent } from './author-list';
import { BookAuthorsComponent } from './book-authors';
import { BookDetailComponent } from './book-detail';
import { BookPreviewComponent } from './book-preview';
import { BookPreviewListComponent } from './book-preview-list';
import { BookSearchComponent } from './book-search';
import { LayoutComponent } from './layout';
import { NavItemComponent } from './nav-item';
import { SidenavComponent } from './sidenav';
import { ToolbarComponent } from './toolbar';


export const COMPONENTS = [
  AuthorListComponent,
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
