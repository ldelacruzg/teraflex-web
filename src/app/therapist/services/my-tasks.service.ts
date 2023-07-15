import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MyTasks } from '../interfaces/my-tasks.interface';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class MyTasksService {

    urlApi = environment.urlApi;
    options = {}

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de todas las tareas de un terapeuta*/
    getMyTasks(headers: Map<string, any>): Observable<MyTasks[]> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<MyTasks[]>(this.urlApi + "/logged/tasks", this.options);
    }
}