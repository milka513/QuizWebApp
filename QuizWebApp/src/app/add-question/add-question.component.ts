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
    this.quizService.addQuestion(this.title, this.answers, this.correctNum).subscribe(data => {
      console.log('data', data);
      this.router.navigate(['/dashboard', {msg: 'Sikeres kérdés felvétel', color: 'green'}]);      
    }, error => {
      console.log('error', error);     
      this.router.navigate(['/dashboard', {msg: 'Sikertelen kérdés felvétel', color: 'red'}]);
    })
  }

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
  }

}
