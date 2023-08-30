import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ViewTherapistsDetailComponent } from '../modals/view-therapists-detail/view-therapists-detail.component';
import { GenerateTempPasswordComponent } from '../modals/generate-temp-password/generate-temp-password.component';
import { EditTherapistComponent } from '../edit-therapist/edit-therapist.component';
import { ApiResponseRegisterTherapistI, ApiResponseStatusTherapist, TherapistDetailI } from 'src/app/admin/interfaces/therapists.interface';
import { TherapistsService } from 'src/app/admin/services/therapists.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlerts } from 'src/app/admin/alerts/alerts.component';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-therapists',
  templateUrl: './list-therapists.component.html',
  styleUrls: ['./list-therapists.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListTherapistsComponent {
  /*Variables*/
  optionFilter: string = environment.FIRSTNAME;
  itemsForPage: number = environment.ITEMS_FOR_PAGE;
  initialPage: number = environment.INITIAL_PAGE;
  finalPage: number = environment.ITEMS_FOR_PAGE;
  spinnerStatus: boolean = false;
  statusTherapist: boolean = false;
  optionsPage: any;
  arrayTherapists: TherapistDetailI[] = [];
  therapistsToSearch: TherapistDetailI[] = [];

  /*Constructor*/
  constructor(
    public therapistsService: TherapistsService,
    private headers: DashboardComponent,
    private sweetAlerts: SweetAlerts,
    private toastr: ToastrService,
    private modal: NgbModal,
    private router: Router
  ) { }

  /*ngOninit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.getAllTherapists(true);
  }

  /*Método que obtiene el listado de las tareas que ha creado un terapeuta*/
  getAllTherapists(status: boolean) {
    this.statusTherapist = status;
    this.spinnerStatus = false;
    this.therapistsService.getAllTherapists(this.headers.getHeaders(), status)
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
    const company = '          TeraFlex\nListado de Terapeutas';
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
      docResult.save(`${this.getCurrentDate()}_listado_terapeutas.pdf`);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Terapeutas');
    XLSX.writeFile(workbook, `${this.getCurrentDate()}_listado_terapeutas.xlsx`);
  }

  /*Método que abre el modal para mostrar el detalle de los terapeutas*/
  openModalViewtherapistDetail(viewTherapistDetail: any, therapistID: number) {
    this.modal.open(viewTherapistDetail, { size: 'lg', centered: true });
    ViewTherapistsDetailComponent.therapistID = therapistID;
  }

  /*Método que elimina un terapeuta*/
  desactivateTherapist(idTherapist: number, nameTherapist: string, status: string) {
    this.sweetAlerts.alertConfirmCancel(status + " terapeuta", "¿Está seguro de " + (status).toLowerCase() + " el terapeuta " + (nameTherapist).toUpperCase() + " del sistema TeraFlex?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.spinnerStatus = false;
          this.therapistsService.activateOrDesactivateTherapist(this.headers.getHeaders(), idTherapist)
            .subscribe({
              next: (data: ApiResponseStatusTherapist) => {
                if (status == "Activar")
                  this.getAllTherapists(false);
                else
                  this.getAllTherapists(true);
                this.showToastSuccess("Terapeuta actualizado con éxito", "Éxtio");
                this.spinnerStatus = true;
              },
              error: (error: any) => {
                this.spinnerStatus = true;
                this.showToastError("Error", "No se pudo " + (status).toLowerCase() + " el terapeuta");
              }
            })
        }
      });
  }

  /*Método que cambia el filtro entre los activos e inactivos (Eliminados)*/
  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "true")
      this.getAllTherapists(true);
    else if (value === "false")
      this.getAllTherapists(false);

  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que redirecciona al componente de editar terapeuta pasando la data*/
  goToEditTherapist(therapistDetail: TherapistDetailI) {
    EditTherapistComponent.therapistDetail = therapistDetail;
    this.router.navigateByUrl("/admin/home/dashboard/therapists/edit-therapist")
  }

  /*Método que arroja una alerta para confirmar que desea generar una nueva contraseña*/
  showAlertGeneratePassword(idPatient: number, namePatient: string, modalGenerateNewPassword: any) {
    this.sweetAlerts.alertConfirmCancel("Generar contraseña", "¿Desea generar una nueva contraseña para el terapeuta \"" + (namePatient).toUpperCase() + "\"?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.modal.open(modalGenerateNewPassword, { size: 'md', centered: true });
          GenerateTempPasswordComponent.idTherapist = idPatient;
        }
      });
  }

  /*Icons to use*/
  iconTherapists = iconos.faUserNurse;
  iconAdd = iconos.faPlusCircle
  iconGeneratePassword = iconos.faKey;
  iconViewDetails = iconos.faEye;
  iconEdit = iconos.faEdit;
  iconDesactivate = iconos.faToggleOn;
  iconActivate = iconos.faToggleOff;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
}
