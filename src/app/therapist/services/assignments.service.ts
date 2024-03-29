import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { APIResponseListTreatmentByPatientI, ApiResponseAssignTasksToPatientI, ApiResponseListTasksAssignsToPatientI, ApiResponseTaskDetailExtendAssignToPatientI, AssignTasksToPatientI, ListTreatmentI } from '../interfaces/assigments.interface';
import { DetailTreatmentI } from '../interfaces/patients.interface';

@Injectable({
    providedIn: 'root'
})
export class AssigmentsService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
    registerTasksAssignToPatient(headers: Map<string, any>, treatmentId: number, body: AssignTasksToPatientI): Observable<ApiResponseAssignTasksToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseAssignTasksToPatientI>(this.urlApi + `/treatments/${treatmentId}/assign-tasks`, body, this.options);
    }

    /*Método que obtiene la lista de tareas asignadas a un paciente, mediante su ID*/
    getListTasksAssingToPatient(headers: Map<string, any>, patientId: number): Observable<ApiResponseListTasksAssignsToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseListTasksAssignsToPatientI>(this.urlApi + `/patients/${patientId}/assignments?treatment-active=true`, this.options);
    }

    /*Método que obtiene el detalle de una tarea asignada a un paciente, mediante su ID*/
    getTaskDetailAssignToPatient(headers: Map<string, any>, assignmentId: number): Observable<ApiResponseTaskDetailExtendAssignToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseTaskDetailExtendAssignToPatientI>(this.urlApi + `/assignments/${assignmentId}`, this.options);
    }

    /*Método que elimina una tarea asignada a un paciente*/
    deleteTaskAssignToPatient(headers: Map<string, any>, idTaskAssigned: number[]): Observable<string> {
        this.options = this.authService.getHeaders(headers);
        let queryParams = "?";
        queryParams += `id=${idTaskAssigned}`;
        return this.http.delete<string>(this.urlApi + `/assignments${queryParams}`, this.options);
    }

    /*Método que obtiene el listado de tratamientos del paciente*/
    getTreatments<T extends ListTreatmentI | DetailTreatmentI>(headers: Map<string, any>, idPatient: number,treatmentActive?: boolean, tasksNumber: boolean = true): Observable<APIResponseListTreatmentByPatientI<T>> {
        this.options = this.authService.getHeaders(headers);
        let queryParams = "?";
        queryParams += `patientId=${idPatient}`;
        queryParams += `&tasksNumber=${tasksNumber}`;

        if(treatmentActive !== undefined){
            queryParams += `&treatmentActive=${treatmentActive}`;
        }

        return this.http.get<APIResponseListTreatmentByPatientI<T>>(this.urlApi + `/treatments${queryParams}`, this.options);
    }
}