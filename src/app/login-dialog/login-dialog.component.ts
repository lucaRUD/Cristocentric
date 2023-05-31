import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.router.navigate(['/login'],{ queryParams: { returnUrl: this.data.returnUrl } });
    this.dialogRef.close();
    
  }
}