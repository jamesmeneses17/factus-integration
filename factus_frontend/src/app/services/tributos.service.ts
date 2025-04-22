import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TributosService {
  private url = 'https://api-sandbox.factus.com.co/v1/tributes/products?name='; // <-- este es el correcto

  constructor(private http: HttpClient) {}

  obtenerTributos(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(this.url, { headers });
  }
}
