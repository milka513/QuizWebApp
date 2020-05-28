import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { ResultComponentComponent } from './result-component/result-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    TopScorersComponent,
    QuizComponent,
    AddQuestionComponent,
    ViewQuestionsComponent,
    ResultComponentComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
