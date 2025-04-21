import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  // Usa el endpoint de pruebas o producción según lo necesites
  // Producción: https://api.factus.com.co/v1/bills/validate
  // Sandbox (pruebas): https://api-sandbox.factus.com.co/v1/bills/validate
  private url = 'https://api-sandbox.factus.com.co/v1/bills/validate'; // <-- cámbialo a sandbox si estás probando

  constructor(private http: HttpClient) {}

  enviarFactura(factura: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,  // <-- IMPORTANTE: siempre Bearer
      'Content-Type': 'application/json'
    });

    return this.http.post(this.url, factura, { headers });
  }
}
