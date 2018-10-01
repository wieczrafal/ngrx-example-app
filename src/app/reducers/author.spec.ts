import * as authorActions from '../actions/author';
import * as author from './author';

describe('AuthorReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = author.reducer(undefined, action);
      expect(result).toEqual(author.initialState);
    });
  });

  describe('LOAD', () => {
    it('should set loading flag to true', () => {
      const expectedResult: author.State = {
        loaded: false,
        loading: true,
        authors: []
      };

      const result = author.reducer(author.initialState, new authorActions.LoadAction());
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should set correct flags and pass forward payload', () => {
      const authors = ['aaa', 'bbb', 'ccc'];
      const expectedResult: author.State = {
        loaded: true,
        loading: false,
        authors: authors
      };

      const result = author.reducer(author.initialState, new authorActions.LoadSuccessAction(authors));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('ADD_AUTHOR_SUCCESS & REMOVE_AUTHOR_FAIL', () => {
    function testAddAuthor(action: authorActions.Actions) {
      const expectedResult: author.State = {
        loaded: false,
        loading: false,
        authors: ['aaa']
      };

      const result = author.reducer(author.initialState, action);
      expect(result).toEqual(expectedResult);
    }

    function testAddSameAuthor(action: authorActions.Actions) {
      const expectedResult: author.State = {
        loaded: false,
        loading: false,
        authors: ['aaa']
      };

      const result = author.reducer({...author.initialState, authors: ['aaa']}, action);
      expect(result).toEqual(expectedResult);
    }

    it('should add author to the author list', () => {
      testAddAuthor(new authorActions.AddAuthorSuccessAction('aaa'));
      testAddAuthor(new authorActions.RemoveAuthorFailAction('aaa'));
    });

    it('should return unchanged state if author already in the list', () => {
      testAddSameAuthor(new authorActions.AddAuthorSuccessAction('aaa'));
      testAddSameAuthor(new authorActions.RemoveAuthorFailAction('aaa'));
    });
  });

  describe('REMOVE_AUTHOR_SUCCESS & ADD_AUTHOR_FAIL', () => {
    function testRemoveAuthor(action: authorActions.Actions) {
      const expectedResult: author.State = {
        loaded: false,
        loading: false,
        authors: ['bbb']
      };

      const result = author.reducer({...author.initialState, authors: ['aaa', 'bbb']}, action);
      expect(result).toEqual(expectedResult);
    }

    it('should remove author from the author list', () => {
      testRemoveAuthor(new authorActions.RemoveAuthorSuccessAction('aaa'));
      testRemoveAuthor(new authorActions.AddAuthorFailAction('aaa'));
    });
  });

});
