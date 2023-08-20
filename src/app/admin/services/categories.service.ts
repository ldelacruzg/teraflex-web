import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { ApiResponseCategoriesI, ApiResponseCreateCategoryI, ApiResponseEditCategoryI, bodyCreateCategoryI } from '../interfaces/categories.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    /*Variables*/
    urlApi = environment.urlApi;
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Request-Header': 'Content-type',
        'Access-Control-Allow-Origin': '*'
    });
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
    ) { }

    /*Método que obtiene los headers*/
    public getHeaders(headers: Map<string, any> | undefined) {

        if (headers != null) {
            headers.forEach((value, key) => {
                this.headers = this.headers.append(key, value || '');
            });
        }
        this.headers = this.headers.delete('Authorization');
        this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
        this.options = { headers: this.headers };
        return this.options;
    }

    /*Método que obtiene el listado de todas las categorias disponibles*/
    getAllCategories(headers: Map<string, any>): Observable<ApiResponseCategoriesI> {
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseCategoriesI>(this.urlApi + `/categories`, this.options);
    }

    /*Método que crea una nueva categoría*/
    createCategory(headers: Map<string, any>, body: bodyCreateCategoryI): Observable<ApiResponseCreateCategoryI> {
        this.options = this.getHeaders(headers);
        return this.http.post<ApiResponseCreateCategoryI>(this.urlApi + `/categories`, body, this.options);
    }

    /*Método que obtiene el detalle de la categoría por su ID*/
    getCategoryById(headers: Map<string, any>, categoryID: number): Observable<ApiResponseCreateCategoryI> {
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseCreateCategoryI>(this.urlApi + `/categories/${categoryID}`, this.options);
    }

    /*Método que edita una categoría por su ID*/
    editCategory(headers: Map<string, any>, body: bodyCreateCategoryI, categoryID: number): Observable<ApiResponseEditCategoryI> {
        this.options = this.getHeaders(headers);
        return this.http.put<ApiResponseEditCategoryI>(this.urlApi + `/categories/${categoryID}`, body, this.options);
    }

    /*Método que elimina una categoría*/
    deleteCategory(headers: Map<string, any>, categoryID: number): Observable<string> {
        this.options = this.getHeaders(headers);
        return this.http.delete<string>(this.urlApi + `/categories/${categoryID}`, this.options);
    }
}