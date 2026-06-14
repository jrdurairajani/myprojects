import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSipCalculator } from './app-sip-calculator';

describe('AppSipCalculator', () => {
  let component: AppSipCalculator;
  let fixture: ComponentFixture<AppSipCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSipCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSipCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
