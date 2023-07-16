import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiResponseMyTasksI } from '../interfaces/my-tasks.interface';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class MyTasksService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de todas las tareas de un terapeuta*/
    getAllMyTasks(headers: Map<string, any>, status: boolean): Observable<ApiResponseMyTasksI> {
        let queryParams = "?";
        queryParams += `status=${status}`;
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseMyTasksI>(this.urlApi + `/logged/tasks/${queryParams}`, this.options);
    }

    /*Método que elimina una tarea*/
    deleteTask(idTask:number, headers: Map<string, any>): Observable<string> {
        this.options = this.authService.getHeaders(headers);
        return this.http.delete<string>(this.urlApi + `/tasks/${idTask}`, this.options);
    }
}