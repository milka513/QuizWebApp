import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { ResultComponentComponent } from './result-component/result-component.component';

const routes: Routes = [
 {path: '', component: LoginComponent},
 {path: 'login', component: LoginComponent},
 {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
 {path: 'registration', component: RegistrationComponent},
 {path: 'scores', component: TopScorersComponent},
 {path: 'quiz', component: QuizComponent},
 {path: 'addquestion', component: AddQuestionComponent},
 {path: 'viewquestions', component: ViewQuestionsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
