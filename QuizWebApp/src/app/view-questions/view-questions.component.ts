import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  response = [];
  keys = [];
  questions = [];  

  ngOnInit(): void {
    this.getQuestions();
  }
  
  deleteQuestion(id:string) {
    this.quizService.deleteQuestion(id).subscribe(data => {
      console.log('data', data);      
    }, error => {
      console.log('error', error);
    })
  }
  
  getQuestions() {
    this.quizService.getAllQuestions().subscribe(data => {
      console.log('data', data);
      this.response = data.data;
      this.keys = Object.keys(this.response);
      
      for(let prop of this.keys) {
        this.questions.push(this.response[prop]);
      }

    }, error => {
      console.log('error', error);     
    })
  }

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

}
