import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-loan-eligibility',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-loan-eligibility.html',
  styleUrls: ['./app-loan-eligibility.scss']
})
export class AppLoanEligibility implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  monthlyIncome = 50000;
  allowedPercent = 50; // percent of income usable for EMI
  rate = 9; // annual
  years = 20;

  eligibleEmi = 0;
  eligibleLoan = 0;

  private chart: Chart | null = null;

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }

  calculate() {
    const income = Number(this.monthlyIncome) || 0;
    const perc = Number(this.allowedPercent) / 100 || 0;
    const emiAvailable = income * perc;
    this.eligibleEmi = Math.round(emiAvailable);

    const monthlyRate = Number(this.rate) / 100 / 12 || 0;
    const n = Number(this.years) * 12 || 0;
    if (monthlyRate === 0) {
      this.eligibleLoan = Math.round(emiAvailable * n);
    } else {
      const factor = (1 - Math.pow(1 + monthlyRate, -n)) / monthlyRate;
      this.eligibleLoan = Math.round(emiAvailable * factor);
    }

    this.updateChart();
  }

  private createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels: ['Eligible EMI', 'Other Expenses'], datasets: [{ data: [this.eligibleEmi || 1, Math.max(0, (this.monthlyIncome - this.eligibleEmi))], backgroundColor: ['#3b82f6', '#e9f6f0'] }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    const other = Math.max(0, this.monthlyIncome - this.eligibleEmi);
    this.chart.data.datasets![0].data = [Math.max(1, this.eligibleEmi), other];
    this.chart.update();
  }
}
