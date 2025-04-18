import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RangosService {
  constructor(private http: HttpClient) {}

  obtenerRangos(): Observable<any> {
    return this.http.get('http://localhost:8000/api/rangos/');
  }
}
