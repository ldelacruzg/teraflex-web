import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';
import { AuthService } from './auth.service';
import { MyTasks } from '../interfaces/my-tasks.interface';

@Injectable({
    providedIn: 'root'
})
export class MyTasksService {

    url: string = "https://jordanfvc26-bookish-telegram-67g4q99rw4q24xg4-3000.preview.app.github.dev";
    options = {}

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    //Método que obtiene el listado de todas las tareas de un terapeuta
    getMyTasks(headers: Map<string, any>): Observable<MyTasks[]> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<MyTasks[]>(this.url + "/tasks", this.options);
    }
}