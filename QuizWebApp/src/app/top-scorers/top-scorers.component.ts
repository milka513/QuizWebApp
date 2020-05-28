import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoresService } from '../services/scores.service';

@Component({
  selector: 'app-top-scorers',
  templateUrl: './top-scorers.component.html',
  styleUrls: ['./top-scorers.component.css']
})
export class TopScorersComponent implements OnInit {

  response = [];
  keys = [];
  board = [];

  constructor(private router: Router,  private scoresService: ScoresService) { }

  ngOnInit(): void {   
    this.getScores(this.scoresService);
  }

  getScores(scoreService: ScoresService) {        
    this.scoresService.getScores().subscribe(data => {
      console.log('data', data);
      this.response = data.data;
      this.keys = Object.keys(this.response);
      
      for(let prop of this.keys) {
        this.board.push(this.response[prop]);
      }

      this.board.sort(function(a,b) {
        return a.score < b.score ? 1 : a.score > b.score ? -1 : 0
      });
    }, error => {
      console.log('error', error);     
    })
  }
  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

}
