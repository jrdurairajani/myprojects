import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home-loan',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule],
  templateUrl: './app-home-loan.html',
  styleUrls: ['./app-home-loan.scss']
})
export class AppHomeLoan implements OnInit {
  loanValue = 5000000;
  downPayment = 20;
  insurance = 1.5;
  rate = 7.5;
  years = 20;
  startMonth = 'Jun 2026';
  maintenance = 2500;

  emi = 0;
  totalInterest = 0;
  totalPayment = 0;
  principal = 0;
  propertyTax = 0;
  homeInsurance = 0;
  monthlyExpenses = 0;

  schedule: Array<any> = [];

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }

  calculate() {
    const loanAmount = this.loanValue * (1 - this.downPayment / 100);
    const monthlyRate = this.rate / 100 / 12;
    const n = this.years * 12;
    this.emi = monthlyRate === 0 ? loanAmount / n : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    this.totalInterest = Math.round(this.emi * n - loanAmount);
    this.totalPayment = Math.round(this.emi * n + this.propertyTax + this.homeInsurance + this.maintenance * 12);
    this.principal = Math.round(loanAmount);
    this.propertyTax = Math.round(this.loanValue * 0.001); // default 0.1%
    this.homeInsurance = Math.round(this.loanValue * 0.0008); // default 0.08%
    this.monthlyExpenses = this.maintenance;
    this.buildSchedule(loanAmount, monthlyRate, n);
    this.updateChart();
  }

  private buildSchedule(loanAmount: number, monthlyRate: number, n: number) {
    this.schedule = [];
    let balance = loanAmount;
    for (let i = 1; i <= Math.min(n, 12); i++) {
      const interest = balance * monthlyRate;
      const principal = this.emi - interest;
      balance -= principal;
      this.schedule.push({
        month: `Month ${i}`,
        principal: Math.round(principal),
        interest: Math.round(interest),
        total: Math.round(this.emi),
        balance: Math.max(Math.round(balance), 0)
      });
    }
  }

  private createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal', 'Interest', 'Taxes & Insurance'],
        datasets: [{
          data: [this.principal || 1, this.totalInterest || 0, this.propertyTax + this.homeInsurance],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, cutout: '70%' }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.datasets![0].data = [Math.max(1, this.principal), Math.max(0, this.totalInterest), Math.max(0, this.propertyTax + this.homeInsurance)];
    this.chart.update();
  }
}
