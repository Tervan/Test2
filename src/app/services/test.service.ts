import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//httOptions for post and put
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TestService {
  testUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getTest() {
    return this.http.get(this.testUrl);
  }
}
