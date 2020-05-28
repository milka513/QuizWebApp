import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
 {path: '', component: LoginComponent},
 {path: 'login', component: LoginComponent},
 {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
 {path: 'registration', component: RegistrationComponent},
 {path: 'scores', component: TopScorersComponent},
 {path: 'quiz', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
