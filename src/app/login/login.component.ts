import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error = '';
  show: boolean = false;

  toggleShow() {
    this.show = !this.show;
  }

  constructor(private authService: AuthService,private http: HttpClient) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // handle successful login
        // Set user as logged in and set user data
        this.authService.setLoggedIn(true);
        this.authService.setUser(response);
      },
      (error) => {
        this.error = 'Invalid username or password';
      }
    );
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  ngOnInit(): void {
  }

}
