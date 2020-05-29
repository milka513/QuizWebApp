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
import { OnlyAdminGuardService } from './services/only-admin-guard.service';
import { OnlyUserGuardService } from './services/only-user-guard.service';
import { OnlyAfterQuizGuardService } from './services/only-after-quiz-guard.service';

const routes: Routes = [
 {path: '', component: LoginComponent},
 {path: 'login', component: LoginComponent},
 {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
 {path: 'registration', component: RegistrationComponent},
 {path: 'scores', component: TopScorersComponent, canActivate: [AuthGuardService]},
 {path: 'quiz', component: QuizComponent, canActivate: [OnlyUserGuardService]},
 {path: 'addquestion', component: AddQuestionComponent, canActivate: [OnlyAdminGuardService]},
 {path: 'viewquestions', component: ViewQuestionsComponent, canActivate: [OnlyAdminGuardService]},
 {path: 'result', component: ResultComponentComponent, canActivate: [OnlyAfterQuizGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
