import * as collectionActions from '../actions/collection';
import { Book } from './../models/book';
import * as collection from './collection';

describe('CollectionReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = collection.reducer(undefined, action);
      expect(result).toEqual(collection.initialState);
    });
  });

  describe('LOAD', () => {
    it('should set loading flag to true', () => {
      const expectedResult: collection.State = {
        loaded: false,
        loading: true,
        ids: []
      };

      const result = collection.reducer(collection.initialState, new collectionActions.LoadAction());
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should set correct flags and map ids from payload', () => {
      const books: Book[] = [{id: '1'} as Book, {id: '2'} as Book, {id: '3'} as Book];
      const expectedResult: collection.State = {
        loaded: true,
        loading: false,
        ids: ['1', '2', '3']
      };

      const result = collection.reducer(collection.initialState, new collectionActions.LoadSuccessAction(books));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('ADD_BOOK_SUCCESS & REMOVE_BOOK_FAIL', () => {
    function testAddBook(action: collectionActions.Actions) {
      const expectedResult: collection.State = {
        loaded: false,
        loading: false,
        ids: ['1']
      };

      const result = collection.reducer(collection.initialState, action);
      expect(result).toEqual(expectedResult);
    }

    function testAddSameBook(action: collectionActions.Actions) {
      const expectedResult: collection.State = {
        loaded: false,
        loading: false,
        ids: ['1']
      };

      const result = collection.reducer({...collection.initialState, ids: ['1']}, action);
      expect(result).toEqual(expectedResult);
    }

    it('should add book to the collection list', () => {
      testAddBook(new collectionActions.AddBookSuccessAction({ id: '1' } as Book));
      testAddBook(new collectionActions.RemoveBookFailAction({ id: '1' } as Book));
    });

    it('should return unchanged state if book already in the list', () => {
      testAddSameBook(new collectionActions.AddBookSuccessAction({ id: '1' } as Book));
      testAddSameBook(new collectionActions.RemoveBookFailAction({ id: '1' } as Book));
    });
  });

  describe('REMOVE_BOOK_SUCCESS & ADD_BOOK_FAIL', () => {
    function testRemoveAuthor(action: collectionActions.Actions) {
      const expectedResult: collection.State = {
        loaded: false,
        loading: false,
        ids: ['2']
      };

      const result = collection.reducer({...collection.initialState, ids: ['1', '2']}, action);
      expect(result).toEqual(expectedResult);
    }

    it('should remove book from the collection list', () => {
      testRemoveAuthor(new collectionActions.RemoveBookSuccessAction({ id: '1' } as Book));
      testRemoveAuthor(new collectionActions.AddBookFailAction({ id: '1' } as Book));
    });
  });

});
