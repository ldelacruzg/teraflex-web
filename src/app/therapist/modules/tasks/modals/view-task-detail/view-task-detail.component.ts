import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-task-detail',
  templateUrl: './view-task-detail.component.html',
  styleUrls: ['./view-task-detail.component.css']
})
export class ViewTaskDetailComponent {

  /*Variables*/
  static taskID: number =0;

  /*Constructor*/
  constructor(
    public modal: NgbModal
  ) { }

  /*Icons to use*/
  iconTask = iconos.faFileLines;
}
