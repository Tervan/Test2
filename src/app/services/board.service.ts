import { CreateBoardDTO } from './../dto/createBoard.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardDto } from '../dto/board.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardURL = 'http://localhost:3000/board';

  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<any> {
    return this.http.get(this.boardURL);
  }

  getBoardsOfUser(id: number): Observable<any> {
    return this.http.get(this.boardURL + `/ofUser/${id}`);
  }

  getOneBoard(id: number): Observable<any> {
    return this.http.get(this.boardURL + `/${id}`);
  }

  saveBoard(board: CreateBoardDTO): Observable<any> {
    return this.http.post(this.boardURL, board, httpOptions);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete(this.boardURL + `/${id}`);
  }
}
