import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable()
export class UsersService {
    protected URL = 'http://jsonplaceholder.typicode.com/users';

    constructor(protected http: HttpClient) {
    }

    public findById(id: any): Observable<User> {
        return this.http.get<User>(this.URL + '/' + id);
    }

    public findAll(params?): Observable<User[]> {
        return this.http.get<User[]>(this.URL, {params});
    }

    public update(user: User): Observable<User> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<User>(this.URL + '/' + user.id, user, {headers});
    }
}
