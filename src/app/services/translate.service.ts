import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http : HttpClient) { }

  private api = 'http://localhost:5000/predict'

  translate(text : string, target : string){
    let body = {
      text,
      target
    }
    return this.http.post<TranslateResponse>(this.api, body)
  }
}
