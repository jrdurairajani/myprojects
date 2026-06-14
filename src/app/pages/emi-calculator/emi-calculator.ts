import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { AppEmiCalculatorForm } from '../app-emi-calculator-form/app-emi-calculator-form';
import { AppSipCalculator } from '../app-sip-calculator/app-sip-calculator';
import { AppFdCalculator } from '../app-fd-calculator/app-fd-calculator';
import { AppLoanEligibility } from '../app-loan-eligibility/app-loan-eligibility';
import { AppCreditCardEmi } from '../app-credit-card-emi/app-credit-card-emi';
import { AppRetirement } from '../app-retirement/app-retirement';


@Component({
  selector: 'app-emi-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    AppEmiCalculatorForm,
    AppSipCalculator,
    AppFdCalculator,
    AppLoanEligibility,
    AppCreditCardEmi,
    AppRetirement
  ],
  templateUrl: './emi-calculator.html',
  styleUrls: ['./emi-calculator.scss']
})
export class EmiCalculator {
  
}