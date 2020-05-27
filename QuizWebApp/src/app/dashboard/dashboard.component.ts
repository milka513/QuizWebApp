import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private Router: Router) { }

  ngOnInit(): void {
  }

  navigateBack() {
    this.Router.navigate(['/login']);
  }

  topScorers() {
    this.Router.navigate(['/scores']);
  }

  solveQuiz() {
    this.Router.navigate(['/quiz']);
  }

}
