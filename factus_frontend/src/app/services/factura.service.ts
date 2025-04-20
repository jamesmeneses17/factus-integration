import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private apiUrl = 'http://localhost:8000/api/factura';

  constructor(private http: HttpClient) {}

  enviarFactura(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, 
      { withCredentials: true });
  }
  
}
