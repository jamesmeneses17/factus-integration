import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://api-sandbox.factus.com.co/oauth/token';

  private clientId = '9e5044cb-f5b5-49b1-aa73-dff89bb8adfd';
  private clientSecret = 'vTSznOQscc1mu5wnCas4Lsm9TDiMgF0hC1KGQvky';
  private username = 'sandbox@factus.com.co';
  private password = 'sandbox2024%';

  constructor(private http: HttpClient) {}

  obtenerToken(): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('username', this.username)
      .set('password', this.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(this.authUrl, body, { headers });
  }
}
