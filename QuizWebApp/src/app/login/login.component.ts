import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string;
  username: string;
  password: string;

  constructor(private route:ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  clickLogin() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log('data', data);
      localStorage.setItem('username', this.username)
    }, error => {
      console.log('error', error);     
    })
  }

}
