import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-articles.html',
  styleUrls: ['./app-articles.scss']
})
export class AppArticles {
  articles = [
    { title: 'How EMI Works: A Simple Guide', summary: 'Understand the EMI formula, monthly payments, and how interest impacts your loan cost.' },
    { title: 'Top Tips to Save on Home Loan Interest', summary: 'Practical ways to reduce your home loan burden through prepayments, tenure choices and rate reviews.' },
    { title: 'SIP vs Lumpsum: Which Investment Style Suits You?', summary: 'Compare systematic investing and lumpsum investing across market scenarios.' },
    { title: 'Why Fixed Deposits Still Matter in Your Portfolio', summary: 'Learn when FDs are useful for stability, guaranteed returns, and cash planning.' },
    { title: 'Planning Retirement with a Strong Corpus', summary: 'Build a retirement plan using ongoing savings, growth assumptions, and risk management.' },
    { title: 'Credit Card EMI: Smart Use and Cost Awareness', summary: 'Know how to calculate card EMIs and manage interest so your repayment stays affordable.' },
    { title: 'How Loan Eligibility Is Calculated by Banks', summary: 'Explore the factors lenders consider for salary, DTI ratio, and loan repayment capacity.' },
    { title: 'Best Practices for Loan Prepayment', summary: 'Find out when and how partial prepayment can save interest without hurting your cash flow.' },
    { title: 'Choosing the Right Tenure for Your Loan', summary: 'Balance monthly EMI affordability with total interest cost across tenures.' },
    { title: 'Understanding Compound Interest for FD and SIP', summary: 'A primer on compounding and why longer investing adds more value.' },
    { title: 'Emergency Fund Planning Alongside Loans', summary: 'Keep your financial safety net intact even when you have active debt.' },
    { title: 'SIP Calculators: What Inputs Matter Most', summary: 'Use investment amount, rate, and duration to project your SIP returns accurately.' },
    { title: 'Credit Card Balance Transfer vs EMI', summary: 'Compare balance transfer options with card EMI programs for debt relief.' },
    { title: 'Retirement Budgeting for Every Decade', summary: 'Set retirement savings goals by age and expected post-retirement expenses.' },
    { title: 'Loan Calculator Myths and Facts', summary: 'Separate the common misconceptions from the real mechanics of loan EMI and eligibility calculators.' }
  ];
}
