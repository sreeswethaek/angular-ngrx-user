import {Action} from '@ngrx/store';
import {User} from '../shared/user';

export const GET_USERS = '[ALL] Users';
export const GET_USERS_SUCCESS = '[ALL] Users Success';
export const GET_USERS_ERROR = '[ALL] Users Error';

export const GET_USER = '[GET] User';
export const GET_USER_SUCCESS = '[GET] Users Success';
export const GET_USER_ERROR = '[GET] Users Error';

export const UPDATE_USER = '[UPDATE] User';
export const UPDATE_USER_SUCCESS = '[UPDATE] User Success';
export const UPDATE_USER_ERROR = '[UPDATE] User Error';

/****************************************
 * GET all the users
 ****************************************/
export class GetAllUsers implements Action {
  readonly type = GET_USERS;
}

export class GetAllUsersSuccess implements Action {
  readonly type = GET_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class GetAllUsersError implements Action {
  readonly type = GET_USERS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET user by id
 ****************************************/
export class GetUser implements Action {
  readonly type = GET_USER;

  constructor(public payload: number) {
  }
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetUserError implements Action {
  readonly type = GET_USER_ERROR;

  constructor(public payload: Error) {
  }
}



/****************************************
 * UPDATE user by id
 ****************************************/
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
}

export class UpdateUserError implements Action {
  readonly type = UPDATE_USER_ERROR;

  constructor(public payload: Error) {
  }
}
