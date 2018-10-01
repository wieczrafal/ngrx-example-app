import * as layoutActions from '../actions/layout';
import * as layout from './layout';

describe('LayoutReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = layout.reducer(undefined, action);
      expect(result).toEqual(layout.initialState);
    });
  });

  describe('CLOSE_SIDENAV', () => {
    it('should set showSidenav flag to false', () => {
      const expectedResult: layout.State = {
        showSidenav: false
      };

      const result = layout.reducer({ showSidenav: true }, new layoutActions.CloseSidenavAction());
      expect(result).toEqual(expectedResult);
    });
  });

  describe('OPEN_SIDENAV', () => {
    it('should set showSidenav flag to true', () => {
      const expectedResult: layout.State = {
        showSidenav: true
      };

      const result = layout.reducer(layout.initialState, new layoutActions.OpenSidenavAction());
      expect(result).toEqual(expectedResult);
    });
  });

});
