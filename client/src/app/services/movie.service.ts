import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl: string = 'https://movies-app1.p.rapidapi.com/api';
  constructor(private http: HttpClient) {}

  getAll() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '58b017252fmsh8384cd09f5f34bbp16a752jsn216133d0bee5',
        'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com',
      },
    };
    return this.http.get(`${this.baseUrl}/movies`, options);
  }
}
