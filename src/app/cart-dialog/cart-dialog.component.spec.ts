import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDialogComponent } from './cart-dialog.component';

describe('CartDialogComponent', () => {
  let component: CartDialogComponent;
  let fixture: ComponentFixture<CartDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDialogComponent]
    });
    fixture = TestBed.createComponent(CartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
