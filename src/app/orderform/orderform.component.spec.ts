import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormComponent } from './orderform.component';

describe('OrderformComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFormComponent]
    });
    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
