import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { LoginUser } from '../models/loginUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private jwtService: JwtService,
    private jwtHelperService: JwtHelperService
  ) { }
  path = 'http://localhost:61061/api/auth/';
  userToken: any;
  decodedToken: any;

  TOKEN_KEY = 'token';

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.jwtHelperService.decodeToken(data.toString());
        this.alertifyService.success('Sisteme giriş yapıldı');
        this.router.navigateByUrl('/auth');
      });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, { headers: headers })
      .subscribe(data => { });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error('Sistemden çıkış yapıldı');
  }

  loggedIn() {
    return this.jwtHelperService.isTokenExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    return this.jwtHelperService.decodeToken(this.token).nameid;
  }
}
