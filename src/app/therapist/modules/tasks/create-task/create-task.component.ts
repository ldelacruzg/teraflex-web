import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseMyVideosI, GetAllMyVideosI } from 'src/app/therapist/interfaces/videos.interface';
import { ApiResponseCategoriesI, GetCategoryI } from 'src/app/therapist/interfaces/categories.interface';
import { ApiResponseRegisterTaskDetailI, RegisterTaskDetailI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { CategoriesService } from 'src/app/therapist/services/categories.service';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { VideosService } from 'src/app/therapist/services/videos.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewMyVideosComponent } from '../../videos/modals/view-my-videos/view-my-videos.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadVideoComponent } from '../modals/upload-video/upload-video.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css', './../list-my-tasks/list-my-tasks.component.css'],
})
export class CreateTaskComponent {
  /*Variables*/
  @ViewChild('stepper') stepper!: MatStepper;
  optionFilter: string = environment.TITLE;
  uploadTaskForm!: FormGroup;
  spinnerStatus: boolean = false;
  isMobileView: boolean = false;
  itemsForPage: number = environment.ITEMS_FOR_PAGE;
  initialPage: number = environment.INITIAL_PAGE;
  finalPage: number = environment.ITEMS_FOR_PAGE;
  optionVisibilitySelected: string = "";
  optionCategorySelected: string = "";
  arrayVideosInfo: GetAllMyVideosI[] = [];
  arrayCategories: GetCategoryI[] = [];
  videosToSearch: GetAllMyVideosI[] = [];
  arrayVideosId: number[] = []; /*Array que contiene los id de los videos*/
  selectedCheckboxes: { [key: number]: boolean } = {}; /*Array que contiene temporalmente el valor de los checks*/

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private categoriesService: CategoriesService,
    private videosService: VideosService,
    private tasksService: MyTasksService,
    private toastr: ToastrService,
    private router: Router,
    public modal: NgbModal,
    public dialog: MatDialog
  ) {
    this.isMobileView = window.innerWidth <= 760;
  }

  /*Verifica el tamaño de la pantalla para cambiar a móvil*/
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth <= 760;
  }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createUploadTaskForm();
    this.getAllMyVideos();
    this.getAllCategories();
  }

  /*Método que obtiene el listado de todas las categorías disponibles*/
  getAllCategories() {
    this.categoriesService.getAllCategories(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseCategoriesI) => {
          this.arrayCategories = data.data;
          this.arrayCategories.sort((a, b) => a.name.localeCompare(b.name));
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo cargar la lista de categorías");
        }
      });
  }

  /*Método que obtiene el listado de todos los videos públicos y que ha subido un terapeuta*/
  getAllMyVideos() {
    this.spinnerStatus = false;
    this.videosService.getAllMyVideos(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseMyVideosI) => {
          this.arrayVideosInfo = data.data;
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo cargar la lista de videos");
        }
      });
  }

  /*Crea el formulario que registra una tarea*/
  createUploadTaskForm() {
    this.uploadTaskForm = this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$"),
        ],
      ],
      visibility: ['',
        [Validators.required],
      ],
      category: ['',
        [Validators.required],
      ],
      timeEstimated: ['',
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      description: ['',
        [Validators.required],
      ],
    });
  }

  /*Método que obtiene la información del form, para mandarla al registrar*/
  getInfoFormUploadTask() {
    let formUploadTask: RegisterTaskDetailI = {
      title: this.uploadTaskForm.get('title')?.value,
      isPublic: this.uploadTaskForm.get('visibility')?.value === "public" ? true : false,
      categoryIds: [Number(this.uploadTaskForm.get('category')?.value)],
      estimatedTime: parseInt(this.uploadTaskForm.get('timeEstimated')?.value),
      description: this.uploadTaskForm.get('description')?.value,
      fileIds: this.arrayVideosId,
      status: true,
    }
    return formUploadTask;
  }

  /*Método que manda a guardar el detalle de la tarea con los videos asignados*/
  registerTaskDetail() {
    this.spinnerStatus = false;
    if(this.arrayVideosId.length != 0){
      this.tasksService.registerTaskDetailWithVideos(this.headers.getHeaders(), this.getInfoFormUploadTask())
        .subscribe({
          next: (data: ApiResponseRegisterTaskDetailI) => {
            this.showToastSuccess(data.message, "Éxito");
            this.spinnerStatus = true;
            this.router.navigateByUrl("therapist/home/dashboard/tasks/my-tasks");
          },
          error: (error) => {
            this.spinnerStatus = true;
            this.showToastError("Error", "No ha podido registrar su tarea");
          }
        });
    }
    else{
      this.spinnerStatus = true;
      this.showToastError("Error", "Debe seleccionar al menos un video para la tarea");
    }
  }

  /*Método para avanzar al siguiente paso en el stepper*/
  nextStepAssignTasks() {
    this.stepper.next();
  }

  /*Método que cambia las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayVideosInfo.length) {
      this.finalPage = this.arrayVideosInfo.length;
    }
  }

  /*Método que mantiene marcados los inputs check cuando cambio entre página*/
  addOrRemoveVideoId(id: number) {
    this.selectedCheckboxes[id] = !this.selectedCheckboxes[id];
    const index = this.arrayVideosId.indexOf(id);
    if (index === -1)
      this.arrayVideosId.push(id);
    else
      this.arrayVideosId.splice(index, 1);
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

  /*Método que muestra modal para ver el detalle de una tarea*/
  openModalViewInfoVideo(viewVideoDetail: any, videoDetail: any, videoType: string) {
    this.modal.open(viewVideoDetail, { size: 'lg', centered: true });
    ViewMyVideosComponent.videoDetailRecibed = videoDetail;
    ViewMyVideosComponent.videoType = videoType;
  }

  /*Método que abr el modal para subir los videos*/
  openDialog(): void {
    let dialogRef = this.dialog.open(UploadVideoComponent, {
      width: 'max-content',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.spinnerStatus = false;
      this.arrayVideosInfo= [];
      this.getAllMyVideos();
    });
  }

  /*Icons to use*/
  iconCreateTask = iconos.faFile;
  iconVerDetalles = iconos.faEye;
  iconBack = iconos.faArrowLeft;
  iconNextStep = iconos.faArrowRight;
  iconPreviousStep = iconos.faArrowLeft;
  iconAdd = iconos.faCirclePlus;
  iconInformation = iconos.faInfoCircle;
}
