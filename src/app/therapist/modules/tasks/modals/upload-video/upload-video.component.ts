import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  status!: boolean;

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    public router: Router,
    public dialogRef: MatDialogRef<UploadVideoComponent>,
  ){}

  /*Método que cierra el modal*/
  onNoClick(): void {
    this.dialogRef.close();
  }

  /*Icons to use*/
  iconVideoCamera = iconos.faVideoCamera;
}
