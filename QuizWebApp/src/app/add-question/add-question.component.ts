import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  title: string;
  answers = ["", "", "", ""];
  correctNum : number;

  addQuestion() {
    //parameterek elozetes ellenorzese

    this.quizService.addQuestion(this.title, this.answers, this.correctNum).subscribe(data => {
      console.log('data', data);      
    }, error => {
      console.log('error', error);     
    })
  }

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
  }

}
