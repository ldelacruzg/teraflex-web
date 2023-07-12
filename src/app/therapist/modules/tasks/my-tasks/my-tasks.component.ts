import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { MyTasks } from 'src/app/therapist/interfaces/my-tasks.interface';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {

  /*Variables*/
  arrayTasks: MyTasks[] = [];
  formSelect = new FormGroup({
    filtro: new FormControl('ci', Validators.required),
  })

  /*Constructor*/
  constructor(
    private myTasksService: MyTasksService
  ) { }

  ngOnInit(): void {
    this.getListMyTasks()
  }

  /*Método que obtiene el listado de las tareas que ha creado un terapeuta*/
  getListMyTasks() {
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("role", sessionStorage.getItem("role"));
    this.myTasksService.getMyTasks(headers).subscribe((data: MyTasks[]) => {
      this.arrayTasks = data;
    });
  }


  //Iconos a utilizar
  iconMyTasks = iconos.faFileLines;
  iconAdd = iconos.faPlusCircle
  iconVerDetalles = iconos.faEye;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrash;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
  iconChofer = iconos.faUser;
}
