import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {User} from '../shared/user';
import {Observable} from 'rxjs';
import {getAllUsers} from '../store/users.reducers';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    title = 'List of Users';
    users: Observable<User[]>;

    constructor(
        private store: Store<AppState>) {
    }

    ngOnInit() {
        this.users = this.store.select(getAllUsers);
    }
}
