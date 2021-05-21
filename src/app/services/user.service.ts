import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  registerURL = 'http://localhost:3000/auth/register';
  currentUserURL = 'http://localhost:3000/auth/profile';

  constructor(private http: HttpClient) {}

  // takes username and password and saves them into the DB User
  // saves passwod in hash
  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(
      this.registerURL,
      { username, password },
      httpOptions
    );
  }

  // gets the User that is logged in
  // tslint:disable-next-line: variable-name
  getLoggedInUser(auth_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.get(this.currentUserURL, { headers: headers });
  }
}
