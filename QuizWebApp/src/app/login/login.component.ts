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

      this.loginService.getUserProfile().subscribe(data => {
        console.log('user_profile', data);
  
        let kys = Object.keys(data.data);

        console.log('username:', data.data['username']);
        console.log('userid:', data.data['_id']);
        console.log('role', data.data['role']);
        console.log('score', data.data['score']);

        localStorage.setItem('userid', data.data['_id']);
        localStorage.setItem('score', data.data['score']);
        localStorage.setItem('role', data.data['role']);          
  
      }, error => {
        console.log('error', error)
      })

    }, error => {
      console.log('error', error);     
    })

   
  }

  clickRegistration() {
    this.router.navigate(['/registration']);
  }

}
