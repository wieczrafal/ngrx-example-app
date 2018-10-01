import * as bookActions from '../actions/book';
import { Book } from '../models/book';
import * as search from './search';

describe('SearchReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = search.reducer(undefined, action);
      expect(result).toEqual(search.initialState);
    });
  });

  describe('SEARCH', () => {
    it('should set loading flag to true and set query', () => {
      const expectedResult: search.State = {
        ids: ['1', '2'],
        query: 'aaa',
        loading: true
      };

      const result = search.reducer({...search.initialState, ids: ['1', '2']}, new bookActions.SearchAction('aaa'));
      expect(result).toEqual(expectedResult);
    });

    it('should clear ids array if query is empty', () => {
      const expectedResult: search.State = {
        ids: [],
        query: '',
        loading: false
      };

      const result = search.reducer({...search.initialState, ids: ['1', '2']}, new bookActions.SearchAction(''));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SEARCH_COMPLETE', () => {
    it('should set loading flag to false and set ids array', () => {
      const expectedResult: search.State = {
        ids: ['1', '2'],
        query: 'aaa',
        loading: false
      };

      const result = search.reducer(
        {...search.initialState, loading: true, query: 'aaa'},
        new bookActions.SearchCompleteAction([{id: '1'} as Book, {id: '2'} as Book])
      );
      expect(result).toEqual(expectedResult);
    });
  });

});
