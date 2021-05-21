import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ColumnDTO } from '../dto/column.dto';
import { ColumnService } from '../services/columns.service';
@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css'],
})
export class BoardColumnComponent implements OnInit {
  private modalRef: any;

  constructor(
    private modalService: NgbModal,
    private columnService: ColumnService
  ) {}
  columnsArray: ColumnDTO[] = [];

  ngOnInit(): void {
    this.loadColumns();
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    // this.modalRef.result.then();
  }

  loadColumns(): void {
    this.columnService.getColumnsOfBoard(this._boardID).subscribe((res) => {
      this.columnsArray = res;
    });
  }
  // Nimmt den übergabewert aus einer anderen Componente an und speichert ihn in der Variable baordID
  @Input()
  get boardID(): number {
    return this._boardID;
  }
  set boardID(boardID: number) {
    this._boardID = boardID;
    console.log(this._boardID);
  }
  private _boardID = 0;
}
