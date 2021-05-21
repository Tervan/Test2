import { Observable } from 'rxjs';
import { CreateColumnDTO } from './../dto/createColumn.dto';
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
export class ColumnService {
  dashboardURL = 'http://localhost:3000/column';

  constructor(private http: HttpClient) {}

  getAllColumn() {
    return this.http.get(this.dashboardURL);
  }

  getColumnsOfBoard(id: number): Observable<any> {
    return this.http.get(this.dashboardURL + `/ofBoard/${id}`);
  }

  saveColumn(column: CreateColumnDTO[]): Observable<any> {
    return this.http.post(this.dashboardURL, column, httpOptions);
  }
}
