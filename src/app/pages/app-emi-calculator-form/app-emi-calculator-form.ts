import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-emi-calculator-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './app-emi-calculator-form.html',
  styleUrls: ['./app-emi-calculator-form.scss'],
})
export class AppEmiCalculatorForm implements AfterViewInit, OnDestroy {
  @ViewChild('pieChart', { static: false }) pieChartRef!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  loanAmount = 1000000;
  interestRate = 7.5;
  tenureYears = 10;

  emi = 0;
  totalInterest = 0;
  totalAmount = 0;

  schedule: Array<any> = [];        // monthly rows
  yearlyData: Array<any> = [];      // grouped by year
  expandedYears: Record<number, boolean> = {};

  // store start as Date for material datepicker handling
  startDate: Date = new Date();

  constructor() {
    this.calculateEMI();
  }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  get loanAmountWords(): string {
    return this.numberToWords(Math.round(Number(this.loanAmount) || 0));
  }

  // convert integer to words using Indian numbering (lakh, crore)
  numberToWords(num: number): string {
    if (!num) return 'zero';
    const ones = ['', 'one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

    const twoDigits = (n: number) => {
      if (n < 20) return ones[n];
      const t = Math.floor(n / 10);
      const o = n % 10;
      return tens[t] + (o ? ' ' + ones[o] : '');
    };

    const parts: string[] = [];
    const crore = Math.floor(num / 10000000);
    if (crore) { parts.push(this.numberToWords(crore) + ' crore'); }
    num = num % 10000000;
    const lakh = Math.floor(num / 100000);
    if (lakh) { parts.push(this.numberToWords(lakh) + ' lakh'); }
    num = num % 100000;
    const thousand = Math.floor(num / 1000);
    if (thousand) { parts.push(this.numberToWords(thousand) + ' thousand'); }
    num = num % 1000;
    const hundred = Math.floor(num / 100);
    if (hundred) { parts.push(ones[hundred] + ' hundred'); }
    const rem = num % 100;
    if (rem) {
      if (parts.length) parts.push('and ' + twoDigits(rem));
      else parts.push(twoDigits(rem));
    }
    return parts.join(' ').replace(/\s+/g,' ').trim();
  }

  // Handler when user selects a month from material datepicker
  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<Date>) {
    // normalizedMonth has the selected month+year (day may be 1)
    this.startDate = new Date(normalizedMonth.getFullYear(), normalizedMonth.getMonth(), 1);
    datepicker.close();
    this.calculateEMI();
  }

  onStartMonthChange(value: string) {
    // keep for backward compatibility if you still use <input type="month">
    const [y, m] = (value || '').split('-').map(Number);
    if (y && m) {
      this.startDate = new Date(y, m - 1, 1);
      this.calculateEMI();
    }
  }

  calculateEMI() {
    const P = Number(this.loanAmount) || 0;
    const monthlyRate = Number(this.interestRate) / 100 / 12;
    const n = Number(this.tenureYears) * 12 || 0;

    const emi = monthlyRate === 0 ? (P / n) : (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    this.emi = isFinite(emi) ? emi : 0;

    let balance = P;
    let totalInterest = 0;
    this.schedule = [];

    const startY = this.startDate.getFullYear();
    const startM = this.startDate.getMonth() + 1;

    for (let i = 1; i <= n; i++) {
      const interest = balance * monthlyRate;
      const principal = Math.min(this.emi - interest, balance);
      balance = Math.max(balance - principal, 0);
      totalInterest += interest;

      const date = new Date(startY, startM - 1 + (i - 1));
      this.schedule.push({
        monthIndex: i,
        date,
        monthLabel: this.formatMonth(date),
        emi: this.emi,
        principal,
        interest,
        balance
      });
    }

    this.totalInterest = totalInterest;
    this.totalAmount = P + totalInterest;
    this.updatePieChart();
    this.buildYearlyData();
  }

  private createPieChart() {
    if (!this.pieChartRef?.nativeElement) {
      return;
    }

    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [Number(this.loanAmount), this.totalInterest],
          backgroundColor: ['#67c4ff', '#1f74c6'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2,
          hoverOffset: 14,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#102a43',
              usePointStyle: true,
              padding: 12,
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.raw as number;
                return `${context.label}: ₹ ${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
              },
            },
          },
        },
      },
    });
  }

  private updatePieChart() {
    if (!this.chart) {
      return;
    }
    this.chart.data.datasets[0].data = [Number(this.loanAmount), this.totalInterest];
    this.chart.update();
  }

  buildYearlyData() {
    const map = new Map<number, any>();

    for (const row of this.schedule) {
      const y = row.date.getFullYear();
      if (!map.has(y)) {
        map.set(y, { year: y, principal: 0, interest: 0, total: 0, balance: row.balance, months: [] });
      }
      const entry = map.get(y);
      entry.principal += row.principal;
      entry.interest += row.interest;
      entry.total += (row.principal + row.interest);
      entry.balance = row.balance; // last month of the year will overwrite with correct balance
      entry.months.push(row);
    }

    const totalLoan = Number(this.loanAmount) || 0;
    this.yearlyData = Array.from(map.values())
      .sort((a, b) => a.year - b.year)
      .map(e => ({ ...e, paidToDate: totalLoan ? ((totalLoan - e.balance) / totalLoan) * 100 : 0 }));

    // reset expansions (optionally expand current year)
    const currentYear = new Date().getFullYear();
    this.expandedYears = {};
    this.yearlyData.forEach(y => this.expandedYears[y.year] = (y.year === currentYear));
  }

  formatMonth(d: Date) {
    return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
  }

  toggleYear(year: number) {
    this.expandedYears[year] = !this.expandedYears[year];
  }
}
