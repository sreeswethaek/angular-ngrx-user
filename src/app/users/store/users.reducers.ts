import * as userActions from './users.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {User} from '../shared/user';

export interface State {
  data: User[];
  selected: User;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all users actions
     ************************/
    case userActions.GET_USERS:
      return {
        ...state,
        action: userActions.GET_USERS,
        done: false,
        selected: null,
        error: null
      };
    case userActions.GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case userActions.GET_USERS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET user by id actions
     ************************/
    case userActions.GET_USER:
      return {
        ...state,
        action: userActions.GET_USER,
        done: false,
        selected: null,
        error: null
      };
    case userActions.GET_USER_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case userActions.GET_USER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE user actions
     ************************/
    case userActions.UPDATE_USER:
      return {
        ...state,
        selected: action.payload,
        action: userActions.UPDATE_USER,
        done: false,
        error: null
      };
    case userActions.UPDATE_USER_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case userActions.UPDATE_USER_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };


  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getUsersState = createFeatureSelector < State > ('users');
export const getAllUsers = createSelector(getUsersState, (state: State) => state.data);
export const getUser = createSelector(getUsersState, (state: State) => {
  if (state.action === userActions.GET_USER && state.done) {
    return state.selected;
  } else {
    return null;
  }

});

export const isUpdated = createSelector(getUsersState, (state: State) =>
 state.action === userActions.UPDATE_USER && state.done && !state.error);


export const getUpdateError = createSelector(getUsersState, (state: State) => {
  return state.action === userActions.UPDATE_USER
    ? state.error
   : null;
});
export const getUsersError = createSelector(getUsersState, (state: State) => {
  return state.action === userActions.GET_USERS
    ? state.error
   : null;
});
export const getUserError = createSelector(getUsersState, (state: State) => {
  return state.action === userActions.GET_USER
    ? state.error
   : null;
});
