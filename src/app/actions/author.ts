import { Action } from '@ngrx/store';

export const ADD_AUTHOR =             '[Author] Add Author';
export const ADD_AUTHOR_SUCCESS =     '[Author] Add Author Success';
export const ADD_AUTHOR_FAIL =        '[Author] Add Author Fail';
export const REMOVE_AUTHOR =          '[Author] Remove Author';
export const REMOVE_AUTHOR_SUCCESS =  '[Author] Remove Author Success';
export const REMOVE_AUTHOR_FAIL =     '[Author] Remove Author Fail';
export const LOAD =                   '[Author] Load';
export const LOAD_SUCCESS =           '[Author] Load Success';
export const LOAD_FAIL =              '[Author] Load Fail';

/**
 * Add Author to Collection Actions
 */
export class AddAuthorAction implements Action {
  readonly type = ADD_AUTHOR;

  constructor(public payload: string) { }
}

export class AddAuthorSuccessAction implements Action {
  readonly type = ADD_AUTHOR_SUCCESS;

  constructor(public payload: string) { }
}

export class AddAuthorFailAction implements Action {
  readonly type = ADD_AUTHOR_FAIL;

  constructor(public payload: string) { }
}


/**
 * Remove Author from Collection Actions
 */
export class RemoveAuthorAction implements Action {
  readonly type = REMOVE_AUTHOR;

  constructor(public payload: string) { }
}

export class RemoveAuthorSuccessAction implements Action {
  readonly type = REMOVE_AUTHOR_SUCCESS;

  constructor(public payload: string) { }
}

export class RemoveAuthorFailAction implements Action {
  readonly type = REMOVE_AUTHOR_FAIL;

  constructor(public payload: string) {}
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: string[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = AddAuthorAction
  | AddAuthorSuccessAction
  | AddAuthorFailAction
  | RemoveAuthorAction
  | RemoveAuthorSuccessAction
  | RemoveAuthorFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
