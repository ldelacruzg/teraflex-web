import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    public router: Router,
  ){}

  /*Icons to use*/
  iconVideos = iconos.faVideoCamera;
}
