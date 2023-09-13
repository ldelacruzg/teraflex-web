import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ViewMyPatientsComponent } from '../modals/view-my-patients/view-my-patients.component';
import { EditMyPatientsComponent } from '../edit-my-patients/edit-my-patients.component';
import { ApiResponseActivateDesactivatePatientI, ApiResponseGetMyPatientsI, MyPatientDetailI, MyPatientsI } from 'src/app/therapist/interfaces/patients.interface';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SweetAlerts } from 'src/app/therapist/alerts/alerts.component';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { RegisterMyPatientsComponent } from '../register-my-patients/register-my-patients.component';
import { GenerateNewPasswordComponent } from '../modals/generate-new-password/generate-new-password.component';

@Component({
  selector: 'app-list-my-patients',
  templateUrl: './list-my-patients.component.html',
  styleUrls: ['./list-my-patients.component.css', './../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListMyPatientsComponent {
  /*Variables*/
  optionFilter: string = environment.FIRSTNAME;
  itemsForPage: number = environment.ITEMS_FOR_PAGE;
  initialPage: number = environment.INITIAL_PAGE;
  finalPage: number = environment.ITEMS_FOR_PAGE;
  spinnerStatus: boolean = false;
  statusPatients: boolean = true;
  arrayMyPatients: MyPatientsI[] = [];
  patientsToSearch: MyPatientsI[] = [];

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myPatientsService: PatientsService,
    private toastr: ToastrService,
    private router: Router,
    private sweetAlerts: SweetAlerts,
    private modal: NgbModal
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.getAllMyPatients(true);
  }

  /*Método que cambia el filtro entre los pacientes activos e inactivos*/
  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "true") {
      this.statusPatients = true;
      this.getAllMyPatients(true);
      this.arrayMyPatients = [];
    }
    else if (value === "false") {
      this.statusPatients = false;
      this.getAllMyPatients(false);
      this.arrayMyPatients = [];
    }
  }

  /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
  getAllMyPatients(status: boolean) {
    this.spinnerStatus = false;
    this.myPatientsService.getMyPatients(this.headers.getHeaders(), status)
      .subscribe({
        next: (data: ApiResponseGetMyPatientsI) => {
          this.arrayMyPatients = data.data;
          this.spinnerStatus = true;
        },
        error: () => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo obtener el listado de pacientes");
        }
      })
  }

  /*Método que aobtiene la información cel paciente con la data formateada*/
  getInfoPatientFormat(patient: MyPatientDetailI): MyPatientDetailI {
    const patientBody: MyPatientDetailI = {
      id: 9,
      firstName: patient.firstName,
      lastName: patient.lastName,
      docNumber: patient.docNumber,
      phone: patient.phone,
      birthDate: this.calculateAge(patient.birthDate) + " años",
      description: patient.description,
      status: patient.status,
      createdBy: patient.categoryId,
      updatedBy: patient.updatedBy,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      role: patient.role,
      categoryId: patient.categoryId,
    }
    return patientBody;
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

  /*Método que desvincula un paciente del terapeuta*/
  unBindPatient(idPatient: number, namePatient: string, statusString: string) {
    this.sweetAlerts.alertConfirmCancel(statusString + " paciente", "¿Está seguro de "+statusString.toLowerCase()+" a \"" + (namePatient).toUpperCase() + "\", de su listado de pacientes?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.spinnerStatus = false;
          this.myPatientsService.unBindPatient(this.headers.getHeaders(), idPatient)
            .subscribe({
              next: (data: string) => {
                this.arrayMyPatients = [];
                this.getAllMyPatients(true);
                this.showToastSuccess("Paciente actualizado con éxito", "Éxtio");
                this.spinnerStatus = true;
              },
              error: (error: any) => {
                this.spinnerStatus = true;
                this.showToastError("Error", "No se pudo "+statusString.toLowerCase()+" el paciente");
              }
            })
        }
      });
  }

  /*Método que abre el modal para ver la información detallada del paciente*/
  openModalViewPatientDetail(viewPatientDetail: any, patientID: number) {
    this.modal.open(viewPatientDetail, { size: 'lg', centered: true });
    ViewMyPatientsComponent.patientID = patientID;
  }

  /*Método que redirige al formulario de editar, pasandole el id del paciente*/
  goToEditPatient(patientDetail: MyPatientDetailI) {
    EditMyPatientsComponent.patientDetail = patientDetail;
    this.router.navigateByUrl("/therapist/home/dashboard/patients/edit-patient")
  }

  /*Método que elimina un paciente*/
  activateOrDesactivatePatient(idPatient: number, namePatient: string, status: string) {
    this.sweetAlerts.alertConfirmCancel(status + " paciente", "¿Está seguro de " + (status).toLowerCase() + " el paciente \"" + (namePatient).toUpperCase() + "\"?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.spinnerStatus = false;
          this.myPatientsService.activateOrDesactivatePatient(this.headers.getHeaders(), idPatient)
            .subscribe({
              next: (data: ApiResponseActivateDesactivatePatientI) => {
                this.showToastSuccess("Paciente actualizado con éxito", "Éxtio");
                if (this.statusPatients){
                  this.arrayMyPatients = [];
                  this.getAllMyPatients(true);
                }
                else{
                  this.arrayMyPatients = [];
                  this.getAllMyPatients(false);
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

  /*Método que abre el modal para decidir si crear un nuevo paciente o registrar uno existente*/
  openModalSelectOptionRegisterPatient(optionsRegisterPatient: any) {
    this.modal.open(optionsRegisterPatient, { size: 'lg', centered: true });
  }

  /*Método que arroja una alerta para confirmar que desea generar una nueva contraseña*/
  showAlertGeneratePassword(idPatient: number, namePatient: string, modalGenerateNewPassword: any) {
    this.sweetAlerts.alertConfirmCancel("Generar contraseña", "¿Desea generar una nueva contraseña para el paciente \"" + (namePatient).toUpperCase() + "\"?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.modal.open(modalGenerateNewPassword, { size: 'md', centered: true });
          GenerateNewPasswordComponent.idPatient = idPatient;
        }
      });
  }

  /*Icons to use*/
  iconMyPatients = iconos.faUsers;
  iconAdd = iconos.faPlusCircle;
  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;

  iconGeneratePassword = iconos.faKey;
  iconUnBindPatient = iconos.faBan;
  iconBindPatient = iconos.faLink;
  iconViewDetail = iconos.faEye;
  iconEdit = iconos.faEdit;
  iconDesactivate = iconos.faToggleOn;
  iconActivate = iconos.faToggleOff;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;
}
