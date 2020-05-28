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
  indexes = [];
    
  questionsString = [];
  correctAnswers = [];
  shuffledAnswers = [];
  actualScore : number;

  givenAnswers : any = [];

  constructor(private router: Router, private quizService: QuizService) {  }

  ngOnInit(): void {
    this.getQuestions(this.quizService);
    this.actualScore = parseInt(localStorage.getItem('score'));
  }

  //akkor ha a user jol valaszolt akkor a kerdesert kap 10 pontot
  updateScore(pointsToBeAdded: number) {
    this.quizService.updateScore(pointsToBeAdded).subscribe(data => {
      console.log('data', data);

      let sc = parseInt(localStorage.getItem('score'));
      console.log('former score:', sc);

      sc += pointsToBeAdded;
      localStorage.removeItem('score');
      localStorage.setItem('score', sc.toString());

      this.actualScore=parseInt(localStorage.getItem('score'));
    }, error => {
      console.log('error', error);     
    })
  }

  shuffle(array: Array<any>) {
    var currentIndex = array.length, temporaryValue, randomIndex;
      
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
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

      this.indexes = Object.keys(this.questions);

      for(let index of this.indexes) {
        this.correctAnswers.push(this.questions[index].answers[this.questions[index].correctNum - 1]);
        this.shuffledAnswers.push(this.shuffle(this.questions[index].answers));
      }      

    }, error => {
      console.log('error', error);     
    })
  }

  radioEventHandler(event: any, index:number) {
    this.givenAnswers[index] = event.target.value;
  }

  navigateToResult() {
    console.log('valaszok', this.givenAnswers);

    let points = 0;

    for(let index of this.indexes) {
      if(this.givenAnswers[index] == this.correctAnswers[index]) {
        points += 10;
      }
    }

    this.updateScore(points);
    
    this.router.navigate(['/result', {pts: points, corrects: this.correctAnswers}]);
  }

}
