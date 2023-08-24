import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseGetCircleStatistics } from '../interfaces/statistics.interface';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene la cantidad de paciente por rango de edades, para mostrar en gráfico circular*/
    getCircleStatisticsAgePatients(headers: Map<string, any>): Observable<ApiResponseGetCircleStatistics> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetCircleStatistics>(this.urlApi + `/patients/number-of-pacients-by-ages`, this.options);
    }
}