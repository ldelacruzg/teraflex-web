import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseMyVideosI, ApiResponseRegisterVideoLocalI, RegisterVideoLinkI, RegisterVideoLocal } from '../interfaces/videos.interface';

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
    getAllMyVideos(headers: Map<string, any>, status: boolean): Observable<ApiResponseMyVideosI> {
        this.options = this.authService.getHeaders(headers);
        let queryParams = "?";
        queryParams += `status=${status}`;
        return this.http.get<ApiResponseMyVideosI>(this.urlApi + `/multimedia/all/${queryParams}`, this.options);
    }

    /*Método que consume el servicio para registrar un video en formato .mp4*/
    registerVideoLocal(headers: Map<string, any>, body: FormData): Observable<ApiResponseRegisterVideoLocalI> {
        let headersRemove: string[] = [];
        headersRemove.push("content-type");
        this.options = this.authService.getHeaders(headers);
        this.options = this.authService.removeHeaders(headersRemove)
        return this.http.post<ApiResponseRegisterVideoLocalI>(this.urlApi + "/multimedia/upload/files", body, this.options);
    }

    /*Método que consume el servicio para registrar un video pero como link*/
    registerVideoLink(headers: Map<string, any>, body: any): Observable<ApiResponseRegisterVideoLocalI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseRegisterVideoLocalI>(this.urlApi + "/multimedia/upload/online", body, this.options);
    }
}