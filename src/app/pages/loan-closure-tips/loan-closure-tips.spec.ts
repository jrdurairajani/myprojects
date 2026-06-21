import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanClosureTips } from './loan-closure-tips';

describe('LoanClosureTips', () => {
  let component: LoanClosureTips;
  let fixture: ComponentFixture<LoanClosureTips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanClosureTips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanClosureTips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
