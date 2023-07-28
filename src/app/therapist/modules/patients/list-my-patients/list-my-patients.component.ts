import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientsI, MyPatientDetailI } from 'src/app/therapist/interfaces/patients.interface';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-my-patients',
  templateUrl: './list-my-patients.component.html',
  styleUrls: ['./list-my-patients.component.css', './../../tasks/my-tasks/my-tasks.component.css']
})
export class ListMyPatientsComponent {
  /*Variables*/
  spinnerStatus: boolean = false;
  arrayMyPatients: MyPatientDetailI[] = [];
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myPatientsService: PatientsService,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.getAllMyPatients();
  }

  /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
  getAllMyPatients() {
    this.spinnerStatus = false;
    this.myPatientsService.getMyPatients(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseGetMyPatientsI) => {
          data.data.forEach(element => {
            this.arrayMyPatients.push(element.patient);
          })
          this.spinnerStatus = true;
        },
        error: () => {
          this.showToastError("Error", "No se pudo obtener el listado de pacientes");
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

  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayMyPatients.length) {
      this.finalPage = this.arrayMyPatients.length;
    }
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
    const company = '          TeraFlex\nListado de Mis pacientes';
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
      docResult.save(`${this.obtenerFechaActual()}_mis_pacientes.pdf`);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mis Pacientes');
    XLSX.writeFile(workbook, `${this.obtenerFechaActual()}_mis_pacientes.xlsx`);
  }

  /*Método que obtiene la fecha actual para mostrarla en el archivo PDF*/
  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }


  /*Icons to use*/
  iconMyPatients = iconos.faUsers;
  iconAdd = iconos.faAdd;
  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;

  iconViewDetail = iconos.faEye;
  iconEdit = iconos.faEdit;
  iconDelete = iconos.faTrash;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;
}
