import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post<{ access_token: string }>('http://localhost:61061/api/auth/login', {
        // tslint:disable-next-line:object-literal-shorthand
        username,
        // tslint:disable-next-line:object-literal-shorthand
        password
      })
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  register(username: string, password: string) {
    return this.httpClient
      .post<{ access_token: string }>(
        'http://localhost:61061/api/auth/register',
        // tslint:disable-next-line:object-literal-shorthand
        { username, password }
      )
      .pipe(
        tap(res => {
          this.login(username, password);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
