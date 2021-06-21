import {Component, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {GetUser, UpdateUser} from '../store/users.actions';
import {getUser} from '../store/users.reducers';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    title = 'User Details';
    user: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.store.dispatch(new GetUser(+params.id));
        });
        this.store.select(getUser).subscribe(user => {
            if (user != null) {
                this.user = user;
            }
        });
    }


    onSaveUser() {
        this.store.dispatch(new UpdateUser(this.user));
    }


    onBack() {
        this.router.navigate(['/users']);
    }


}
