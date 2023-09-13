import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ViewPatientsDetailComponent } from '../modals/view-patients-detail/view-patients-detail.component';
import { ApiResponseGetAllPatientsI, GetPatientDetailI } from 'src/app/admin/interfaces/patients.interface';
import { ApiResponseActivateDesactivatePatientI } from 'src/app/therapist/interfaces/patients.interface';
import { PatientsService } from 'src/app/admin/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlerts } from 'src/app/admin/alerts/alerts.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListPatientsComponent {
  /*Variables*/
  optionFilter: string = environment.FIRSTNAME;
  itemsForPage: number = environment.ITEMS_FOR_PAGE;
  initialPage: number = environment.INITIAL_PAGE;
  finalPage: number = environment.ITEMS_FOR_PAGE;
  spinnerStatus: boolean = false;
  statusPatients: boolean = true;
  optionsPage: any;
  arrayPatients: GetPatientDetailI[] = [];
  patientsToSearch: GetPatientDetailI[] = [];

  /*constructor*/
  constructor(
    private headers: DashboardComponent,
    private patientsService: PatientsService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private sweetAlerts: SweetAlerts
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
    if (value === "true") {
      this.statusPatients = true;
      this.getAllPatients(true);
      this.arrayPatients = [];
    }
    else if (value === "false") {
      this.statusPatients = false;
      this.getAllPatients(false);
      this.arrayPatients = [];
    }
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

  openModalViewtherapistDetail(viewTherapistDetail: any, patientDetail: GetPatientDetailI) {
    this.modal.open(viewTherapistDetail, { size: 'lg', centered: true });
    ViewPatientsDetailComponent.patientDetailRecived = patientDetail;
  }

  /*Método que Activa o Desactiva un paciente*/
  ActivateDesactivatePatient(idPatient: number, namePatient: string, status: string) {
    this.sweetAlerts.alertConfirmCancel(status + " paciente", "¿Está seguro de " + (status).toLowerCase() + " el paciente \"" + (namePatient).toUpperCase() + "\"?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.spinnerStatus = false;
          this.patientsService.activateOrDesactivatePatient(this.headers.getHeaders(), idPatient)
            .subscribe({
              next: (data: ApiResponseActivateDesactivatePatientI) => {
                this.showToastSuccess("Paciente actualizado con éxito", "Éxito");
                if (this.statusPatients) {
                  this.arrayPatients = [];
                  this.getAllPatients(true);
                }
                else {
                  this.arrayPatients = [];
                  this.getAllPatients(false);
                }
                this.spinnerStatus = true;
              },
              error: (error: any) => {
                this.spinnerStatus = true;
                this.showToastError("Error", "No se pudo " + (status).toLowerCase() + " el paciente");
              }
            })
        }
      });
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconPatients = iconos.faUsers;
  iconViewDetails = iconos.faEye;
  iconDesactivate = iconos.faToggleOn;
  iconActivate = iconos.faToggleOff;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
}
