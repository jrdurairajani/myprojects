import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sip-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-sip-calculator.html',
  styleUrls: ['./app-sip-calculator.scss']
})
export class AppSipCalculator implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  // Common inputs
  mode: 'sip' | 'lumpsum' = 'sip';

  // SIP inputs
  monthly = 25000;
  sipRate = 12; // annual percent
  sipYears = 10;

  // Lumpsum inputs
  lumpsumAmount = 3000000;
  lumpsumRate = 12;
  lumpsumYears = 10;

  // Results
  invested = 0;
  estimatedReturns = 0;
  totalValue = 0;

  private chart: Chart | null = null;

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }

  setMode(m: 'sip' | 'lumpsum') {
    this.mode = m;
    this.calculate();
  }

  calculate() {
    if (this.mode === 'sip') {
      this.calculateSIP();
    } else {
      this.calculateLumpsum();
    }
    this.updateChart();
  }

  private calculateSIP() {
    const P = Number(this.monthly) || 0;
    const annualRate = Number(this.sipRate) / 100 || 0;
    const nMonths = Number(this.sipYears) * 12 || 0;
    const r = annualRate / 12;

    // Future value of an ordinary annuity (contribution at the end of period)
    const factor = r === 0 ? nMonths : (Math.pow(1 + r, nMonths) - 1) / r;
    const fv = P * factor;

    this.invested = P * nMonths;
    this.totalValue = Math.round(fv);
    this.estimatedReturns = Math.round(this.totalValue - this.invested);
  }

  private calculateLumpsum() {
    const PV = Number(this.lumpsumAmount) || 0;
    const annualRate = Number(this.lumpsumRate) / 100 || 0;
    const years = Number(this.lumpsumYears) || 0;

    const fv = PV * Math.pow(1 + annualRate, years);

    this.invested = PV;
    this.totalValue = Math.round(fv);
    this.estimatedReturns = Math.round(this.totalValue - this.invested);
  }

  private createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Invested amount', 'Est. returns'],
        datasets: [{
          data: [this.invested || 1, this.estimatedReturns || 0],
          backgroundColor: ['#e9f6f0', '#3b82f6'],
          hoverBackgroundColor: ['#e9f6f0', '#3b82f6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        cutout: '70%'
      }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    const invested = Math.max(1, this.invested);
    const returns = Math.max(0, this.estimatedReturns);
    this.chart.data.datasets![0].data = [invested, returns];
    this.chart.update();
  }
}
