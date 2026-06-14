import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-fd-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-fd-calculator.html',
  styleUrls: ['./app-fd-calculator.scss']
})
export class AppFdCalculator implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  amount = 100000;
  rate = 6.5;
  years = 5;

  invested = 0;
  estimatedReturns = 0;
  totalValue = 0;

  private chart: Chart | null = null;

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }

  calculate() {
    const P = Number(this.amount) || 0;
    const r = Number(this.rate) / 100 || 0;
    const n = Number(this.years) || 0;

    const fv = P * Math.pow(1 + r, n);

    this.invested = P;
    this.totalValue = Math.round(fv);
    this.estimatedReturns = Math.round(this.totalValue - this.invested);
    this.updateChart();
  }

  private createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Invested amount', 'Est. returns'],
        datasets: [{ data: [this.invested || 1, this.estimatedReturns || 0], backgroundColor: ['#e9f6f0', '#3b82f6'] }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.datasets![0].data = [Math.max(1, this.invested), Math.max(0, this.estimatedReturns)];
    this.chart.update();
  }
}
