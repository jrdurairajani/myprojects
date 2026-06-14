import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmiCalculator } from './pages/emi-calculator/emi-calculator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-root',
  imports: [RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  mobileMenuOpen = false;
  currentYear = new Date().getFullYear();

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
