import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  success: boolean = false;
  activationMessage: string = '';
  token: string = '';

  constructor(private http: HttpClient,private route: ActivatedRoute,  private router: Router,) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');
    console.log(uid);
    console.log(token);
    if (!uid || !token) {
      this.activationMessage = 'Token or UID is missing';
      return;
    }
    const api_url = `http://127.0.0.1:8000/accounts/verify-email/${uid}/${token}/`;
    this.http.get(api_url, {}).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.activationMessage = 'Account activated successfully';
          this.success=true;
        } else {
          this.activationMessage = 'Invalid or expired token';
          this.success=false;
        }
      },
      error => {
        console.error(error);
        this.activationMessage = 'Failed to activate account';
        this.success=false;
      }
    );
  }
}