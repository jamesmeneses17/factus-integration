import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnidadesService {
  constructor(private http: HttpClient) {}

  obtenerUnidades(): Observable<any> {
    return this.http.get('http://localhost:8000/api/unidades-medida/');
  }
}
