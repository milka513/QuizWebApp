import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  deleteQuestion(id: string) : Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete('http://localhost:3000/server/question/deletequestion/' + id, httpOptions)
  }

  getScore() : Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('http://localhost:3000/server/user/listallscores', httpOptions)
  }

  getAllQuestions(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('http://localhost:3000/server/question/getquestions', httpOptions)
  }

  getQuestions(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/server/question/listspecnumquestions',{num:1}, httpOptions)
  }

  addQuestion(title: string, answers: Array<string>, correctNum: number) : Observable<any> {
    console.log('title:', title, 'answers:', answers, 'correctNum:', correctNum);

    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/server/question/addquestion', {title: title, answers: answers, correctNum: correctNum}, httpOptions)
  }

  updateScore(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("userid putnal", localStorage.getItem('userid'));
    return this.http.put('http://localhost:3000/server/user/updatescore',{score: 10, userId: localStorage.getItem('userid')}, httpOptions)
  }
}
