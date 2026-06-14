import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEmiCalculatorForm } from './app-emi-calculator-form';

describe('AppEmiCalculatorForm', () => {
  let component: AppEmiCalculatorForm;
  let fixture: ComponentFixture<AppEmiCalculatorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEmiCalculatorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEmiCalculatorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
