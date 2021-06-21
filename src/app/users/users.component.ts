import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllUsers} from './store/users.actions';
import {
  getUsersError, getUpdateError, isUpdated
} from './store/users.reducers';

@Component({
  selector: 'app-users',
  template: `
    <router-outlet></router-outlet>`
})
export class UsersComponent implements OnInit {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllUsers());

    // subscriptions when success or error action
    this.store.select(getUsersError).subscribe((error) => this.loadingError(error));
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'The user was updated successfully!!!');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the user');
    });

  }

  /**
   * Display error message if load of users fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of users');
    }
  }

  /**
   * Display success message after execute specific action over the user
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      alert(message);
      this.router.navigate(['/users']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }
}
