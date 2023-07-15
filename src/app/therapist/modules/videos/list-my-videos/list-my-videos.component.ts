import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { GetAllVideos } from 'src/app/therapist/interfaces/videos.interface';
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
  arrayVideos: GetAllVideos[] = [];
  itemsForPage = 7;
  initialPage = 0;
  finalPage = 7;

  /*Constructor*/
  constructor(
    private myVideosService: VideosService,
    private headers: DashboardComponent
  ){}

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    //this.getAllMyVideos();
  }

  /*Método que obtiene el listado de todos los videos que ha subido un terapeuta*/
  getAllMyVideos(){
    this.spinnerStatus = false;
    this.myVideosService.getAllMyVideos(this.headers.getHeaders()).subscribe((data) => {
      this.arrayVideos = data;
      console.log("ENTRANDO Y MIRA LA DATA DE VIDEOS")
      console.log(data);
      this.spinnerStatus = true;
    }, error => {
      this.spinnerStatus = true;
      //alert("No se pudieron obtener los datos...");
    });
  }

  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.initialPage = e.pageIndex * e.pageIndex;
    this.finalPage = this.initialPage + e.pageIndex;
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
