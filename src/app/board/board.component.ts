import { ColumnService } from './../services/columns.service';
import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService
  ) {}

  board: any = {};
  id: number = 0;
  boardName: string | null = '';

  ngOnInit(): void {
    //read 'id' parameter of the URL
    this.route.paramMap.subscribe((params: ParamMap) => {
      let currentId = params.get('id');
      if (typeof currentId === 'string') {
        //null-Checker
        this.id = parseInt(currentId);
      } else {
        //null-Handler
        return;
      }
    });
    //search the board referred by the id
    this.boardService.getOneBoard(this.id).subscribe((res) => {
      this.board = res;
      this.boardName = res.boardName;
    });
  }
}
