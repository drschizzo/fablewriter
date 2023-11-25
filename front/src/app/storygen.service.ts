import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorygenService {

  constructor(private http:HttpClient) { }


  getStory(prompt: string, demo?: boolean):Observable<any> {
    
    return this.http.get('http://localhost:3000/storygen',{
      responseType: 'json',
      observe: 'body',
      params: {
        'demo': 'true',
        'prompt': prompt
      }
    })
  }

  getImage(prompt: string, demo?: boolean):Observable<any> {
    
    return this.http.get('http://localhost:3000/imagegen',{
      responseType: 'text',
      observe: 'body',
      params: {
        'demo': false,
        'prompt': prompt
      }
    })
  }

}
