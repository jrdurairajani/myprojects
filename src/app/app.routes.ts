import { Routes } from '@angular/router';
import { EmiCalculator } from './pages/emi-calculator/emi-calculator';
import { AppHomeLoan } from './pages/app-home-loan/app-home-loan';
import { AppAbout } from './pages/app-about/app-about';
import { AppContact } from './pages/app-contact/app-contact';
import { AppPrivacyPolicy } from './pages/app-privacy-policy/app-privacy-policy';
import { AppDisclaimer } from './pages/app-disclaimer/app-disclaimer';
import { AppTerms } from './pages/app-terms/app-terms';
import { AppArticles } from './pages/app-articles/app-articles';
import { LoanClosureTips } from './pages/loan-closure-tips/loan-closure-tips';

export const routes: Routes = [
  { path: '', component: EmiCalculator },
  { path: 'home-loan', component: AppHomeLoan },
  { path: 'loan-closure-tips', component: LoanClosureTips },
  { path: 'about', component: AppAbout },
  { path: 'contact', component: AppContact },
  { path: 'privacy-policy', component: AppPrivacyPolicy },
  { path: 'disclaimer', component: AppDisclaimer },
  { path: 'terms', component: AppTerms },
  { path: 'articles', component: AppArticles },
  { path: '**', redirectTo: '' }
];
