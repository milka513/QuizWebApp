import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private Router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  viewQuestions() {
    this.Router.navigate(['/viewquestions']);
  }

  addQuestion() {
    this.Router.navigate(['/addquestion']);  
  }

  navigateBack() {
    this.loginService.logout();
    this.Router.navigate(['/login']);
  }

  topScorers() {
    this.Router.navigate(['/scores']);
  }

  solveQuiz() {
    this.Router.navigate(['/quiz']);
  }

}
