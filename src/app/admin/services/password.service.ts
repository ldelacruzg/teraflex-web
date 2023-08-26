import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { AuthService } from 'src/app/therapist/services/auth.service';
import { ApiResponseChangePasswordI, ApiResponseGeneratedNewPassword, BodyChangePasswordI } from '../interfaces/password.interface';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que cambia la contraseña de un terapeuta*/
    changePassword(headers: Map<string, any>, newPassword: BodyChangePasswordI): Observable<ApiResponseChangePasswordI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseChangePasswordI>(this.urlApi + `/auth/change-password`, newPassword, this.options);
    }

    /*Método que genera una nueva contraseña para el paciente*/
    generateNewPassword(headers: Map<string, any>, idPatient: number): Observable<ApiResponseGeneratedNewPassword> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGeneratedNewPassword>(this.urlApi + `/auth/generate-password/${idPatient}`, this.options);
    }
}