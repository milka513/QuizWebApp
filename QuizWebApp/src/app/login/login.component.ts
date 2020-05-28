import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string;
  username: string;
  password: string;

  constructor(private route:ActivatedRoute, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {    
    localStorage.clear();
    
    this.loginService.logout().subscribe(data=>{
      console.log(data);
    });
  }

  clickLogin() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log('data', data);
      localStorage.setItem('username', this.username);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log('error', error);     
    })

    this.loginService.setUserId().subscribe(data => {
      console.log('data_scores', data);

      for(let prop of data.data) {
        if(prop.username == this.username) {
          console.log('username:', this.username);
          console.log('userid:', prop._id);

          localStorage.setItem('userid', prop._id);
        }
      }

    }, error => {
      console.log('error', error)
    })
  }

  clickRegistration() {
    this.router.navigate(['/registration']);
  }

}
