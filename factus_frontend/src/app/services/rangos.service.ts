import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RangosService {
  private url = 'https://api-sandbox.factus.com.co/v1/numbering-ranges?filter[id]&filter[document]&filter[resolution_number]&filter[technical_key]&filter[is_active]';

  constructor(private http: HttpClient) {}

  obtenerRangos(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(this.url, { headers });
  }
}
