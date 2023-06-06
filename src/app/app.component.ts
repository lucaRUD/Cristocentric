import { Component } from '@angular/core';
import { PublicService } from './services/public.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slider } from 'src/route-animations';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider],
})
export class AppComponent {
  title = 'frontend';
  msg: any;

  constructor(
    private pService: PublicService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      console.log(this.authService.isLoggedIn);
    });

    this.authService.getAuthStatus().subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          // handle successful authentication
          this.authService.setLoggedIn(true);
          // fetch user data
          // update UI
          // redirect to a different page
        } else {
          // handle failed authentication
        }
      },
      (error) => {
        // handle error response
      }
    );
  }

  showMessage() {
    this.pService.getMessage().subscribe((data) => {
      (this.msg = data), console.log(this.msg);
    });
  }
}
