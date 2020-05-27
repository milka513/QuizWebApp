import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  msg: string;

  username: string;
  password: string;
  password2: string;


  constructor(private route: ActivatedRoute, private router: Router, private regService: RegistrationService) { }

  ngOnInit(): void {
  }

  registration() {
    if(this.password == this.password2) {
      this.regService.registration(this.username, this.password).subscribe(data => {
        console.log('data', data);                
      }, error => {
        console.log('error', error);     
      })
    }
  }

  navigateBack() {
    this.router.navigate(['/login']);
  }



}
