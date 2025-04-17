import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'https://api-sandbox.factus.com.co/oauth/token';

  private clientId = '9e5044cb-f5b5-49b1-aa73-dff89bb8adfd';
  private clientSecret = 'vTSznOQscc1mu5wnCas4Lsm9TDiMgF0hC1KGQvky';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('username', email)
      .set('password', password);

    return this.http.post(this.url, body.toString(), { headers });
  }
}
