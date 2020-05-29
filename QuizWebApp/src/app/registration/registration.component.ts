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
  
  constructor(private route: ActivatedRoute, private router: Router, private regService: RegistrationService) { }

  ngOnInit(): void {  
  }

  registration() {    
      this.regService.registration(this.username, this.password).subscribe(data => {
        console.log('data', data);          
        this.msg = 'Sikeres regisztráció';      
        this.router.navigate(['/login', {regMsg: this.msg, color: 'green'}]);  
      }, error => {
        console.log('error', error);     
        this.msg = 'Sikertelen regisztráció';
        this.router.navigate(['/login', {regMsg: this.msg, color: 'red'}]);  
      })         
  }

  navigateBack() {
    this.router.navigate(['/login']);
  }

}
