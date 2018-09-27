import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    inject,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as collection from '../actions/collection';
import { BookDetailMockComponent } from '../mocks/book-detail.mock';
import { Book } from '../models/book';
import * as fromRoot from '../reducers';
import { SelectedBookPageComponent } from './selected-book-page';

describe('SelectedBookPageComponent', () => {
    const bookMock: Book = {
        id: '1',
        volumeInfo: null
    };

    let component: SelectedBookPageComponent;
    let fixture: ComponentFixture<SelectedBookPageComponent>;
    let debugElement: DebugElement;
    let childComponent: BookDetailMockComponent;
    let getSelectedBookSubject: Subject<Book>;
    let isSelectedBookInCollectionSubject: Subject<boolean>;

    beforeEach(async(() => {
        getSelectedBookSubject = new Subject();
        isSelectedBookInCollectionSubject = new Subject();

        TestBed.configureTestingModule({
            declarations: [
                BookDetailMockComponent,
                SelectedBookPageComponent
            ],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: jasmine.createSpy('select').and.callFake(type => {
                            switch (type) {
                                case fromRoot.getSelectedBook:
                                    return getSelectedBookSubject.asObservable();
                                case fromRoot.isSelectedBookInCollection:
                                    return isSelectedBookInCollectionSubject.asObservable();
                                default:
                                    return null;
                            }
                        }),
                        dispatch: jasmine.createSpy('dispatch')
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectedBookPageComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        childComponent = debugElement.query(By.directive(BookDetailMockComponent)).componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        getSelectedBookSubject.complete();
        isSelectedBookInCollectionSubject.complete();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('on init', () => {
        it('should initialize book and isSelectedBookInCollection observables', () => {
            expect(component.book$).toEqual(jasmine.any(Observable));
            expect(component.isSelectedBookInCollection$).toEqual(jasmine.any(Observable));
        });
    });

    describe('public methods', () => {
        describe('addToCollection', () => {
            it('should dispatch AddBookAction with correct data', inject([Store], (store: Store<fromRoot.State>) => {
                component.addToCollection(bookMock);

                expect(store.dispatch).toHaveBeenCalledWith(new collection.AddBookAction(bookMock));
            }));
        });

        describe('removeFromCollection', () => {
            it('should dispatch RemoveBookAction with correct data', inject([Store], (store: Store<fromRoot.State>) => {
                component.removeFromCollection(bookMock);

                expect(store.dispatch).toHaveBeenCalledWith(new collection.RemoveBookAction(bookMock));
            }));
        });
    });

    describe('passed options to book details', () => {
        describe('inputs', () => {
            it('should have values corresponding to store observables', () => {
                getSelectedBookSubject.next(bookMock);
                isSelectedBookInCollectionSubject.next(true);
                fixture.detectChanges();

                expect(childComponent.book).toEqual(bookMock);
                expect(childComponent.inCollection).toEqual(true);

                getSelectedBookSubject.next(null);
                isSelectedBookInCollectionSubject.next(false);
                fixture.detectChanges();

                expect(childComponent.book).toEqual(null);
                expect(childComponent.inCollection).toEqual(false);
            });
        });

        describe('outputs', () => {
            it('should call correct callbacks', inject([Store], (store: Store<fromRoot.State>) => {
                childComponent.add.emit(bookMock);

                expect(store.dispatch).toHaveBeenCalledWith(new collection.AddBookAction(bookMock));

                childComponent.remove.emit(bookMock);

                expect(store.dispatch).toHaveBeenCalledWith(new collection.RemoveBookAction(bookMock));
            }));
        });
    });
});
