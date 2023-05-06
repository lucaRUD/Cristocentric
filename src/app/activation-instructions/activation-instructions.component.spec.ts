import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationInstructionsComponent } from './activation-instructions.component';

describe('ActivationInstructionsComponent', () => {
  let component: ActivationInstructionsComponent;
  let fixture: ComponentFixture<ActivationInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
