import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as userActions from './users.actions';
import {
  GetAllUsersError,
  GetAllUsersSuccess,
  GetUser,
  GetUserError,
  GetUserSuccess,
  UpdateUser,
  UpdateUserError,
  UpdateUserSuccess
} from './users.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {UsersService} from '../shared/users.service';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private svc: UsersService) {
  }

  @Effect()
  getAllUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.GET_USERS),
    switchMap(() => this.svc.findAll()),
    map(heroes => new GetAllUsersSuccess(heroes)),
    catchError((err) => [new GetAllUsersError(err)])
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(userActions.GET_USER),
    map((action: GetUser) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(hero => new GetUserSuccess(hero)),
    catchError((err) => [new GetUserError(err)])
  );


  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(userActions.UPDATE_USER),
    map((action: UpdateUser) => action.payload),
    switchMap(user => this.svc.update(user)),
    map(() => new UpdateUserSuccess()),
    catchError((err) => [new UpdateUserError(err)])
  );


}
