import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/accounts/login/';
  private googleLoginUrl = 'http://localhost:8000/accounts/google/login/';
  private RegisterUrl = 'http://localhost:8000/accounts/register/';
  private logoutUrl = 'http://localhost:8000/accounts/logout/';
  private getAuthStatusUrl = 'http://localhost:8000/accounts/get-auth-status/';
  private getUserUrl= 'http://localhost:8000/accounts/user-data/';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _user = new BehaviorSubject<any>(null);

  getCookie(name: string) {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const cookieStr = cookie.trim();
        if (cookieStr.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookieStr.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  register(username: string,password: string,confirm_password: string,first_name:string,last_name:string, email: string ,phone_number: string,bio:string, birth_date: Date) {
    const body = { username,first_name,last_name, email, password,confirm_password,bio, phone_number,birth_date };
    return this.http.post(this.RegisterUrl, body);
  }


  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
    return this.http.post(this.loginUrl, body, { headers, withCredentials: true });
  }

  logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
  
    this.http.post(this.logoutUrl, {}, { headers, withCredentials: true }).subscribe(
      (response) => {
        // handle successful logout
        this.setLoggedIn(false);
        this.setUser(null);
        location.reload();
        console.log("SHOULD RELOAD");

      },
      (error) => {
        console.log('Error:', error);
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

  getAuthStatus(): Observable<boolean> {
    return this.http.get(this.getAuthStatusUrl, { withCredentials: true }).pipe(
    map((response: any) => response.is_authenticated)
    );
    }


  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }
  getUserData(): Observable<User> {
    return this.http.get<User>(this.getUserUrl, { withCredentials: true });

  }
}