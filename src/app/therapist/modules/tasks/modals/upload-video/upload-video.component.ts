import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  onNoClick(): void {
    console.log("Entrando en el cerrar");
    this.dialogRef.close();
  }

  /*Icons to use*/
  iconVideos = iconos.faVideoCamera;
}
