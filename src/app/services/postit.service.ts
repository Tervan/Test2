import { PostitDTO } from './../dto/postit.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostitService {
  postitURL = 'http://localhost:3000/postit';

  constructor(private http: HttpClient) {}

  getAllPostit() {
    return this.http.get(this.postitURL);
  }

  getPostitOfColumn(id: number): Observable<any> {
    return this.http.get(this.postitURL + `/ofColumn/${id}`);
  }

  savePostit(postit: PostitDTO): Observable<any> {
    return this.http.post(this.postitURL, postit, httpOptions);
  }
}
