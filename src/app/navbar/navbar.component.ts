import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userFirstname: any;
  user!: User;
  cartItemCount = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe(
      (userData) => {
        this.userFirstname = userData.first_name;
      },
      (error) => {
        console.log('Error:', error);
      }
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.authService.getUserData().subscribe(
            (userData) => {
              this.userFirstname = userData.first_name;
            },
            (error) => {
              console.log('Error:', error);
            }
          );
        }
      });

    // Subscribe to changes in the items in the cart
    this.cartService.items$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }
}
