import { Component } from '@angular/core';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { EditCategoriesComponent } from '../edit-categories/edit-categories.component';
import { ViewCategoriesDetailComponent } from '../modals/view-categories-detail/view-categories-detail.component';
import { ApiResponseCategoriesI, GetCategoryI } from 'src/app/therapist/interfaces/categories.interface';
import { CategoriesService } from 'src/app/admin/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { SweetAlerts } from 'src/app/admin/alerts/alerts.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListCategoriesComponent {
  /*Variables*/
  optionFilter: string = environment.CATEGORYNAME;
  spinnerStatus: boolean = false;
  statusTherapist: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  optionsPage: any;
  arrayCategories: GetCategoryI[] = [];
  categoriesToSearch: GetCategoryI[] = [];

  /*constrcutor*/
  constructor(
    private headers: DashboardComponent,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
    private sweetAlerts: SweetAlerts,
    private modal: NgbModal,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.getAllCategories();
  }

  /*Método que obtiene el listado de las categorias*/
  getAllCategories() {
    this.spinnerStatus = false;
    this.categoriesService.getAllCategories(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseCategoriesI) => {
          this.arrayCategories = data.data;
          this.arrayCategories.sort((a, b) => a.name.localeCompare(b.name));
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo cargar la lista de categorías");
        }
      });
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
    const company = '          TeraFlex\nListado de Categorías';
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
      docResult.save(`${this.getCurrentDate()}_listado_categorias.pdf`);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categorías');
    XLSX.writeFile(workbook, `${this.getCurrentDate()}_listado_categorias.xlsx`);
  }

  /*Método que cambia las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayCategories.length) {
      this.finalPage = this.arrayCategories.length;
    }
  }

  /*Método que cambia el filtro entre los activos e inactivos (Eliminados)*/
  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "true")
      this.getAllCategories();
    else if (value === "false")
      this.getAllCategories();
  }

  /*Método que abre el modal para mostrar el detalle de los terapeutas*/
  openModalViewCategoryDetail(viewCategoryDetail: any, categoryID: number) {
    this.modal.open(viewCategoryDetail, { size: 'lg', centered: true });
    ViewCategoriesDetailComponent.categoryID = categoryID;
  }

  /*Método que redirecciona al componente de editar una categoría*/
  goToEditCategory(categoryDetail: any) {
    EditCategoriesComponent.categoryDetail = categoryDetail;
    this.router.navigateByUrl("/admin/home/dashboard/categories/edit-category")
  }

  /*Método que elimina una categoría*/
  desactivateCategory(categoryID: number, categoryName: string) {
    this.sweetAlerts.alertConfirmCancel("Desactivar categoría", "¿Está seguro de desactivar la categoría " + (categoryName).toUpperCase() + " del sistema TeraFlex?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.spinnerStatus = false;
          this.categoriesService.deleteCategory(this.headers.getHeaders(), categoryID)
            .subscribe({
              next: (data: any) => {
                this.getAllCategories();
                this.showToastSuccess("Se desactivó la categoría correctamente", "Éxito");
              },
              error: (error) => {
                this.showToastError("Error", "No se pudo desactivar la categoría");
              }
            });
        }
      });
  }

  
  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
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
  iconCategories = iconos.faFolderTree;;
  iconAdd = iconos.faPlusCircle
  iconViewDetails = iconos.faEye;
  iconEdit = iconos.faEdit;
  iconDelete = iconos.faTrashCan;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
}
