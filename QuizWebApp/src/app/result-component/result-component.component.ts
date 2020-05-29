import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrls: ['./result-component.component.css']
})
export class ResultComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  pts: number = 0;
  cors = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params);

      if (params && params.pts && params.corrects) {
        this.pts = params.pts;
        this.cors = params.corrects;     
      }
    })

  }

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

}
