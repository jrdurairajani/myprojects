import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-retirement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-retirement.html',
  styleUrls: ['./app-retirement.scss']
})
export class AppRetirement implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  currentAge = 30;
  retirementAge = 60;
  currentSavings = 500000;
  monthlyContribution = 10000;
  rate = 12;

  invested = 0;
  estimatedReturns = 0;
  totalValue = 0;

  private chart: Chart | null = null;

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }

  calculate() {
    const years = Math.max(0, this.retirementAge - this.currentAge);
    const n = years * 12;
    const r = Number(this.rate) / 100 / 12 || 0;

    const fvCurrent = this.currentSavings * Math.pow(1 + r, n);
    const factor = r === 0 ? n : (Math.pow(1 + r, n) - 1) / r;
    const fvContrib = this.monthlyContribution * factor;

    this.totalValue = Math.round(fvCurrent + fvContrib);
    this.invested = Math.round(this.currentSavings + (this.monthlyContribution * n));
    this.estimatedReturns = Math.round(this.totalValue - this.invested);

    this.updateChart();
  }

  private createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels: ['Invested', 'Est. returns'], datasets: [{ data: [this.invested || 1, this.estimatedReturns || 0], backgroundColor: ['#e9f6f0', '#3b82f6'] }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.datasets![0].data = [Math.max(1, this.invested), Math.max(0, this.estimatedReturns)];
    this.chart.update();
  }
}
