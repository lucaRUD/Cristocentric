import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/accounts/login/';
  private googleLoginUrl = 'http://localhost:8000/accounts/google/login/';
  private RegisterUrl = 'http://localhost:8000/accounts/register/';
  private logoutUrl = 'http://localhost:8000/accounts/logout/';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.loginUrl, { username, password });
  }

  register(username: string,password: string,confirm_password: string,first_name:string,last_name:string, email: string ,phone_number: string,bio:string, birth_date: Date) {
    const body = { username,first_name,last_name, email, password,confirm_password,bio, phone_number,birth_date };
    return this.http.post(this.RegisterUrl, body);
  }

  logout() {
    this.http.post(this.logoutUrl, {}).subscribe(
      (response) => {
        // handle successful logout
        this.setLoggedIn(false);
        this.setUser(null);
      },
      (error) => {
        // handle error response
      }
    );
  }

  loginWithGoogle() {
    window.location.href = this.googleLoginUrl;
  }

  setLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  setUser(user: any) {
    this._user.next(user);
  }

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }
}