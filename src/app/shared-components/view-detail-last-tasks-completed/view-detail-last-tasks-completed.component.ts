import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { GetDetailLastTasksCompletedByPatientsI } from 'src/app/therapist/interfaces/my-tasks.interface';

@Component({
  selector: 'app-view-detail-last-tasks-completed',
  templateUrl: './view-detail-last-tasks-completed.component.html',
  styleUrls: ['./view-detail-last-tasks-completed.component.css']
})
export class ViewDetailLastTasksCompletedComponent {
  /*Variables*/
  static taskDetailCompletedRecived: GetDetailLastTasksCompletedByPatientsI = {
    assignmentId: 0,
    title: "--",
    isCompleted: true,
    patientFullName: "--",
    updatedAt: "--",
  }
  taskCompletedDetail: GetDetailLastTasksCompletedByPatientsI = {
    assignmentId: 0,
    title: "--",
    isCompleted: true,
    patientFullName: "--",
    updatedAt: "--",
  }

  /*ngOnInit*/
  ngOnInit(){
    this.taskCompletedDetail = ViewDetailLastTasksCompletedComponent.taskDetailCompletedRecived;
  }

  /*Constructor*/
  constructor(
    public modal: NgbModal
  ) { }

  /*Icons to use*/
  iconTask = iconos.faFileAlt;
  iconArrowRight = iconos.faCaretRight;
}
