import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  template: `
    <button (click)="toggleMenu()">Menu</button>
    <div [@slideInOut]="menuState">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    div {
      overflow: hidden;
    }
  `],
  animations: [
      trigger('slideInOut', [
      state('in', style({ height: '*' })),
      state('out', style({ height: '0px' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class DropdownComponent {
  menuState = 'out';

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}