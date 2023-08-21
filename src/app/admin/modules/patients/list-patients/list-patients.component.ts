import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ApiResponseGetAllPatientsI, GetPatientDetailI } from 'src/app/admin/interfaces/patients.interface';
import { PatientsService } from 'src/app/admin/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListPatientsComponent {
  /*Variables*/
  optionFilter: string = environment.FIRSTNAME;
  spinnerStatus: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  optionsPage: any;
  arrayPatients: GetPatientDetailI[] = [];
  patientsToSearch: GetPatientDetailI[] = [];

  /*constructor*/
  constructor(
    private headers: DashboardComponent,
    private patientsService: PatientsService,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.getAllPatients(true);
  }

  /*Método que cambia las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayPatients.length) {
      this.finalPage = this.arrayPatients.length;
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
    const company = '          TeraFlex\nListado de Pacientes';
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
      docResult.save(`${this.getCurrentDate()}_listado_pacientes.pdf`);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
    XLSX.writeFile(workbook, `${this.getCurrentDate()}_listado_pacientes.xlsx`);
  }

  /*Método que cambia el filtro entre los activos e inactivos (Eliminados)*/
  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "true")
      this.getAllPatients(true);
    else if (value === "false")
      this.getAllPatients(false);
  }

  /*Método que obtiene el listado de todos los pacientes*/
  getAllPatients(status: boolean) {
    this.spinnerStatus = false;
    this.patientsService.getAllPatients(this.headers.getHeaders(), status)
      .subscribe({
        next: (data: ApiResponseGetAllPatientsI) => {
          this.arrayPatients = data.data;
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
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

  /*Método que calcula la edad, enviándole la fecha de nacimiento*/
  calculateAge(birthDateString: string): any {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      return yearsDiff - 1;
    }
    return yearsDiff;
  }

  /*Icons to use*/
  iconPatients = iconos.faUsers;
  iconViewDetails = iconos.faEye;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
}
