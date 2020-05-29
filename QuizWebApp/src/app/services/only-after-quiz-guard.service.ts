import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OnlyAfterQuizGuardService {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = localStorage.getItem('role');
    const solved = localStorage.getItem('solved');

    if(role == 'user' && solved == 'true') {      
      return true;
    } 

    this.router.navigate(['/dashboard']);
    return false;
  }
}
