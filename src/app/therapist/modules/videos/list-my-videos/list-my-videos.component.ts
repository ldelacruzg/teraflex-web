import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ApiResponseMyVideosI, GetAllMyVideosI } from 'src/app/therapist/interfaces/videos.interface';
import { VideosService } from 'src/app/therapist/services/videos.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';

@Component({
  selector: 'app-list-my-videos',
  templateUrl: './list-my-videos.component.html',
  styleUrls: ['./list-my-videos.component.css', './../../tasks/my-tasks/my-tasks.component.css']
})
export class ListMyVideosComponent {

  /*Variables*/
  spinnerStatus = false;
  arrayVideos: GetAllMyVideosI[] = [];
  itemsForPage = 5;
  initialPage = 0;
  finalPage = 5;

  /*Constructor*/
  constructor(
    private myVideosService: VideosService,
    private headers: DashboardComponent,
  ){}

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    //this.getAllMyVideos();
  }

  /*Método que obtiene el listado de todos los videos que ha subido un terapeuta*/
  getAllMyVideos(){
    this.myVideosService.getAllMyVideos(this.headers.getHeaders()).subscribe((data: ApiResponseMyVideosI) => {
      this.spinnerStatus = false;
      this.arrayVideos = data.data;
      this.spinnerStatus = true;
    }, error => {
      this.spinnerStatus = true;
      //alert("No se pudieron obtener los datos...");
    });
  }

  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    
    if (this.finalPage > this.arrayVideos.length) {
      this.finalPage = this.arrayVideos.length;
    }
  }
  
  /*Método que exporta los datos de la tabla, a formato .PDF*/
  downloadPDF() {
  }

  /*Método que exporta los datos de la tabla, a formato .XLSX*/
  downloadXLSX() {
  }

  /*Método que elimina un video*/
  deleteVideo(id: number) {

  }

  /*Icons to user*/
  iconUploadVideo = iconos.faVideoCamera;
  iconAdd = iconos.faPlusCircle;
  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;

  iconVerDetalles = iconos.faEye;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrash;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;
}
