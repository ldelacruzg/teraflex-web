import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  identification = '';
  password = '';
  url: string = "https://jordanfvc26-bookish-telegram-67g4q99rw4q24xg4-3000.preview.app.github.dev"
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Access-Control-Request-Header': 'Content-type',
    'Access-Control-Allow-Origin': '*'
  });

  options = {}

  constructor(
    private http: HttpClient
  ) { }

  //Método que consume el servicio para login
  loginUser(headers: Map<string, any>): Observable<Login> {
    this.getHeaders(headers);
    return this.http.post<Login>(this.url + "/auth/login", null, this.options);
  }

  //Método que obtiene los Headers
  private getHeaders(headers: Map<string, any> | undefined): boolean {
    if (headers != null) {
      headers.forEach((value, key) => {
        this.headers = this.headers.append(key, value || '');
      });
    }
    this.headers = this.headers.delete('Authorization');
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('user')}`);
    this.options = { headers: this.headers };
    return headers != null;
  }
}