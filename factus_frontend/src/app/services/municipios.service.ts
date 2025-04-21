import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private url = 'https://api-sandbox.factus.com.co/v1/municipalities';

  constructor(private http: HttpClient) {}

  obtenerMunicipios(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(this.url, { headers });
  }
}
