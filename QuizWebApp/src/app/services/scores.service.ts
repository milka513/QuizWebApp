import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(private http: HttpClient) { }

  getScores(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>('http://localhost:3000/server/user/listallscores', httpOptions)
  }
}
