import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  msg : string = '';
  color: string;

  constructor(private route: ActivatedRoute, private Router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params && params.msg && params.color) {
        this.msg = params.msg;
        this.color = params.color;
      }
    })

    localStorage.removeItem('solved');    
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
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
