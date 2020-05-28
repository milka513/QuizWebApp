import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

}
