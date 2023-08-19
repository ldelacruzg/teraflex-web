import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseRegisterTherapistI, TherapistDetailI } from 'src/app/admin/interfaces/therapists.interface';
import { TherapistsService } from 'src/app/admin/services/therapists.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewTherapistsDetailComponent } from '../modals/view-therapists-detail/view-therapists-detail.component';

@Component({
  selector: 'app-list-therapists',
  templateUrl: './list-therapists.component.html',
  styleUrls: ['./list-therapists.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListTherapistsComponent {
  /*Variables*/
  optionFilter: string = environment.FIRSTNAME;
  spinnerStatus: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  optionsPage: any;
  arrayTherapists: TherapistDetailI[] = [];
  therapistsToSearch: TherapistDetailI[] = [];

  /*Constructor*/
  constructor(
    public therapistsService: TherapistsService,
    private headers: DashboardComponent,
    private toastr: ToastrService,
    private modal: NgbModal
  ) { }

  /*ngOninit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.getAllTherapists();
  }

  /*Método que obtiene el listado de las tareas que ha creado un terapeuta*/
  getAllTherapists() {
    this.spinnerStatus = false;
    this.therapistsService.getAllTherapists(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseRegisterTherapistI) => {
          this.arrayTherapists = data.data;
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo obtener el listado de terapeutas");
        }
      })
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que cambia las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayTherapists.length) {
      this.finalPage = this.arrayTherapists.length;
    }
  }

  /*Método que obtiene la fecha actual para mostrarla en el archivo PDF*/
  getCurrentDate(): string {
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
    const dateEmision = 'Fecha de emisión: ' + this.getCurrentDate();
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
      docResult.save(`${this.getCurrentDate()}_mis_tareas.pdf`);
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
    XLSX.writeFile(workbook, `${this.getCurrentDate()}_mis_tareas.xlsx`);
  }

  /*Método que abre el modal para mostrar el detalle de los terapeutas*/
  openModalViewtherapistDetail(viewTherapistDetail: any, therapistID: number) {
    this.modal.open(viewTherapistDetail, { size: 'lg', centered: true });
    ViewTherapistsDetailComponent.therapistID = therapistID;
  }

  /*Icons to use*/
  iconTherapists = iconos.faUserNurse;
  iconAdd = iconos.faPlusCircle
  iconVerDetalles = iconos.faEye;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashCan;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;

}
