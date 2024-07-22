import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
private apiUrl = 'https://dog.ceo/api/breeds/image/random';
  constructor(private http: HttpClient) { }
  getRandomDogImages(count: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${count}`);
  }
}
