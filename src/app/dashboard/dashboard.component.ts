import { BoardDto } from './../dto/board.dto';
import { ColumnService } from '../services/columns.service';
import { AuthenticationService } from './../services/authentication.service';
import { UserService } from './../services/user.service';
import { BoardService } from '../services/board.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import {
  uniqueNamesGenerator,
  Config,
  colors,
  animals,
} from 'unique-names-generator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private modalRef: any;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private boardService: BoardService,
    private columnService: ColumnService,
    private router: Router
  ) {}

  // Config for unique name generator
  private boardNameConfig: Config = {
    dictionaries: [colors, animals],
    separator: ' ',
    length: 2,
    style: 'capital',
  };
  boards: BoardDto[] = [];
  boardName: string = '';
  columns: string[] = [];
  currentUser: any = {};

  ngOnInit(): void {
    // Parse 'currenUser' back to Object
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // gets User as response
    this.userService.getLoggedInUser(user.access_token).subscribe((res) => {
      this.currentUser = res;
      // loads all Boards of the current user from the DB and saves them into the array 'boards'
      this.boardService.getBoardsOfUser(res.userId).subscribe((data) => {
        this.boards = data;
      });
    });

    // resets column
    this.columns = [];
  }

  onDeleteClick(column: string) {
    const index = this.columns.indexOf(column);
    this.columns.splice(index, 1);
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return alert('Form is invalid');

    this.columns.push(form.value.text);

    form.reset();
  }

  //opens the Modal, also sets a reference to it via 'modalRef'
  open(content: any) {
    // when the modal is open the name will be generated
    this.boardName = uniqueNamesGenerator(this.boardNameConfig);
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    // this.modalRef.result.then();
  }
  refreshName() {
    this.boardName = uniqueNamesGenerator(this.boardNameConfig);
  }

  saveBoard() {
    let board = { boardName: this.boardName, user: this.currentUser.userId };
    let save = new Array();

    this.boardService.saveBoard(board).subscribe((res) => {
      for (let c of this.columns) {
        save.push({ columnName: c, board: res.id });
      }
      this.columnService.saveColumn(save).subscribe();
      this.modalRef.close(); //; modal.close('Save click')
      this.router.navigate(['/board', res.id]);
    });
  }

  //opens the Board that was clicked
  openBoard(value: number) {
    this.router.navigate(['/board', value]);
  }

  //deletes the Board that was clicked in the Database; also removes it from the UI using filter
  deleteBoard(value: number) {
    if (window.confirm('Do you really want to delete this board?')) {
      this.boardService.deleteBoard(value).subscribe();
      this.boards = this.boards.filter((board) => board.id !== value);
    }
  }
}
