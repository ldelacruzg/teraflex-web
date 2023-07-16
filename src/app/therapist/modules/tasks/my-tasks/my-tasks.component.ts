import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ApiResponseMyTasksI, MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { SweetAlerts } from 'src/app/therapist/alerts/alerts.component';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css'],
})
export class MyTasksComponent {

  /*Variables*/
  arrayTasks: MyTasksI[] = [];
  optionsPage: any;
  itemsForPage = 7;
  initialPage = 0;
  finalPage = 7;
  spinnerStatus = false;
  formSelect = new FormGroup({
    filtro: new FormControl('ci', Validators.required),
  })

  /*Constructor*/
  constructor(
    private myTasksService: MyTasksService,
    private toastr: ToastrService,
    private sweetAlerts: SweetAlerts,
    private headers: DashboardComponent
  ) { }

  /*ngOnInit*/
  ngOnInit(): void {
    this.getListMyTasks()
  }

  /*Método que obtiene los headers*/
  getHeaders() {
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("role", sessionStorage.getItem("role"));
    return headers;
  }

  /*Método que elimina una tarea*/
  deleteTask(idTask: number, nameTask: string) {
    this.sweetAlerts.alertConfirmCancel("Eliminar tarea", "¿Está seguro de eliminar la tarea " + nameTask + "?").then(respuesta => {
      if (respuesta.value == true) {
        this.myTasksService.deleteTask(idTask, this.getHeaders()).subscribe(data => {
          this.spinnerStatus = false;
          this.getListMyTasks();
          this.showToastSuccess("Tarea eliminada con éxito", "Tarea eliminada");
          this.spinnerStatus = true;
        }, error => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo eliminar la tarea");
        });
      }
    });
  }

  /*Método que obtiene el listado de las tareas que ha creado un terapeuta*/
  getListMyTasks() {
    this.spinnerStatus = false;
    this.myTasksService.getAllMyTasks(this.headers.getHeaders(), true).subscribe((data: ApiResponseMyTasksI) => {
      this.arrayTasks = data.data;
      this.spinnerStatus = true;
    }, (error) => {
      this.spinnerStatus = true;
      this.showToastError("Error", "Error al obtener el listado de tareas");
    });
  }

  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.initialPage = e.pageIndex * e.pageIndex;
    this.finalPage = this.initialPage + e.pageIndex;
  }

  /*Método que obtiene la fecha actual para mostrarla en el archivo PDF*/
  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  /*Método que exporta los datos de la tabla, a formato .PDF*/
  downloadPDF() {
    const image = new Image();
    image.src = 'https://res.cloudinary.com/dfzyxagbc/image/upload/v1689220539/logo-teraflex_avz0fx.png';

    //this.estadoSpinner = false;
    const DATA = document.getElementById('htmlTablePDF') as HTMLElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = { background: 'white', scale: 3 };
    //Datos para el encabezado
    const company = '          TeraFlex\nListado de Mis Tareas';
    const dateEmision = 'Fecha de emisión: ' + this.obtenerFechaActual();
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      //Agregar image Canvas al PDF
      const bufferX = 15;
      const bufferY = 155;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      // Agregamos el encabezado
      doc.addImage(image, 'JPEG', 265, 20, 50, 50);
      doc.setFontSize(18);
      doc.text(company, 200, 100); // Posicionamos el texto a 15,30 (X,Y)
      doc.setFontSize(11);
      doc.text(dateEmision, 15, 140);
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.obtenerFechaActual()}_mis_tareas.pdf`);
      //this.estadoSpinner = true;
    });
  }

  /*Método que exporta los datos de la tabla, a formato .XLSX*/
  downloadXLSX() {
    const table = document.getElementById('htmlExcelTable') as HTMLElement;
    const rows: any = [];
    const tableRows = table.querySelectorAll('tr');
    tableRows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td, th');
      const rowData: any = [];
      cells.forEach((cell, cellIndex) => {
        rowData.push((cell as HTMLElement).innerText);
      });
      rows.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mis-Tareas');
    XLSX.writeFile(workbook, `${this.obtenerFechaActual()}_mis_tareas.xlsx`);
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  //Iconos a utilizar
  iconMyTasks = iconos.faFileLines;
  iconAdd = iconos.faPlusCircle
  iconVerDetalles = iconos.faEye;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrash;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
}
