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
  }

  clickLogin() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log('data', data);
      localStorage.setItem('username', this.username);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log('error', error);     
    })
  }

  clickRegistration() {
    this.router.navigate(['/registration']);
  }

}
