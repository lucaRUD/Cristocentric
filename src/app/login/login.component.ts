import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  rememberMe = false;
  show: boolean = false;
  returnUrl: string | null = null;

  toggleShow() {
    this.show = !this.show;
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // handle successful login
        // Set user as logged in and set user data
        this.authService.setLoggedIn(true);
        this.authService.setUser(response);
        this.authService.getUserData();
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          // navigate to default page
        }
      },
      (error) => {
        this.error = 'Invalid username or password';
      }
    );
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
