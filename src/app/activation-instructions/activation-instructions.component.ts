import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activation-instructions',
  templateUrl: './activation-instructions.component.html',
  styleUrls: ['./activation-instructions.component.css']
})
export class ActivationInstructionsComponent implements OnInit {

  userName = history.state.name;
  userEmail = history.state.email;

  constructor() { }

  ngOnInit(): void {
  }

}
