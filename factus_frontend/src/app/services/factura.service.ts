import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FacturasService {
  private apiUrl = 'https://api-sandbox.factus.com.co/v1/bills';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  obtenerFacturas(filtros: any = {}): Observable<any> {
    return this.authService.obtenerToken().pipe(
      switchMap((res: any) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${res.access_token}`,
        });

        const options = {
          headers,
          params: new HttpParams({ fromObject: filtros }),
        };

        return this.http.get(this.apiUrl, options);
      })
    );
  }

  descargarFactura(numeroFactura: string): Observable<any> {
    return this.authService.obtenerToken().pipe(
      switchMap((res: any) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${res.access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        });

        return this.http.get(`${this.apiUrl}/download-pdf/${numeroFactura}`, { headers });
      })
    );
  }

  descargarXML(numeroFactura: string): Observable<any> {
    return this.authService.obtenerToken().pipe(
      switchMap((res: any) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${res.access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        });

        return this.http.get(`${this.apiUrl}/download-xml/${numeroFactura}`, { headers });
      })
    );
  }

  enviarFactura(datosFactura: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    console.log('🔵 Intentando enviar factura con datos:', datosFactura);

    return this.http.post(this.apiUrl, datosFactura, { headers });
  }

  obtenerFacturaPorNumero(numeroFactura: string): Observable<any> {
    return this.authService.obtenerToken().pipe(
      switchMap((res: any) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${res.access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        });

        return this.http.get(`${this.apiUrl}/${numeroFactura}`, { headers });
      })
    );
  }

  obtenerQRFactura(numeroFactura: string): Observable<any> {
    return this.authService.obtenerToken().pipe(
      switchMap((res: any) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${res.access_token}`,
          'Content-Type': 'application/json',
        });
        return this.http.get(`${this.apiUrl}/show/${numeroFactura}`, { headers });
      })
    );
  }
}
