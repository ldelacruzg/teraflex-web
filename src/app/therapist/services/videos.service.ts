import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseMyVideosI } from '../interfaces/videos.interface';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de todos los videos que ha subido un terapeuta*/
    getAllMyVideos(headers: Map<string, any>): Observable<ApiResponseMyVideosI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseMyVideosI>(this.urlApi + "/multimedia/all", this.options);
    }
}