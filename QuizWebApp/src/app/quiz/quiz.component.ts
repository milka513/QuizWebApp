import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { HttpHeaders } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  response = [];
  keys = [];
  questions = [];  
    
  questionString : string;
  correctAnswer :string;
  shuffledAnswers = [];
  actualScore : number;

  constructor(private router: Router, private quizService: QuizService) {  }

  ngOnInit(): void {
    this.getQuestions(this.quizService);
    this.actualScore = parseInt(localStorage.getItem('score'));
  }

  //akkor ha a user jol valaszolt akkor a kerdesert kap 10 pontot
  updateScore(ans: string) {
    if(ans == this.correctAnswer) {
      this.quizService.updateScore().subscribe(data => {
        console.log('data', data);

        let sc = parseInt(localStorage.getItem('score'));
        console.log('former score:', sc);

        sc += 10;
        localStorage.removeItem('score');

        localStorage.setItem('score', sc.toString());

      }, error => {
        console.log('error', error);     
      })
    }  
    
    this.router.navigate(['/result']);
  }

  shuffle(array: Array<any>) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  getQuestions(quizService: QuizService) {
    this.quizService.getQuestions().subscribe(data => {
      console.log('data', data);
      this.response = data.data;
      this.keys = Object.keys(this.response);
      
      for(let prop of this.keys) {
        this.questions.push(this.response[prop]);
      }

      this.questionString = this.questions[0].title;
      this.correctAnswer = this.questions[0].answers[this.questions[0].correctNum - 1];
      this.shuffledAnswers = this.shuffle(this.questions[0].answers);
      console.log('shuffle:', this.shuffledAnswers);

    }, error => {
      console.log('error', error);     
    })
  }

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

}
