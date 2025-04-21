import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
  private url = 'https://api-sandbox.factus.com.co/v1/measurement-units';

  constructor(private http: HttpClient) {}

  obtenerUnidades(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(this.url, { headers });
  }
}
