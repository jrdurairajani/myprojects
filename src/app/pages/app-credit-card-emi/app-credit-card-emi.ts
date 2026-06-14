import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-credit-card-emi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-credit-card-emi.html',
  styleUrls: ['./app-credit-card-emi.scss']
})
export class AppCreditCardEmi implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  outstanding = 50000;
  rate = 24; // annual
  months = 12;

  emi = 0;
  totalPayable = 0;
  interest = 0;

  private chart: Chart | null = null;

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }

  calculate() {
    const PV = Number(this.outstanding) || 0;
    const r = Number(this.rate) / 100 / 12 || 0;
    const n = Number(this.months) || 0;
    if (r === 0) {
      this.emi = n ? PV / n : 0;
    } else {
      const denom = 1 - Math.pow(1 + r, -n);
      this.emi = denom ? (PV * r) / denom : 0;
    }
    this.totalPayable = Math.round(this.emi * n);
    this.interest = Math.round(this.totalPayable - PV);
    this.updateChart();
  }

  private createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels: ['Outstanding', 'Interest'], datasets: [{ data: [this.outstanding || 1, this.interest || 0], backgroundColor: ['#e9f6f0', '#3b82f6'] }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.datasets![0].data = [Math.max(1, this.outstanding), Math.max(0, this.interest)];
    this.chart.update();
  }
}
