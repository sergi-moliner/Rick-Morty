import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<{ results: Character[], info: any }> {
    return this.http.get<{ results: Character[], info: any }>(`${this.apiUrl}?page=${page}`);
  }
  
  searchCharactersByName(name: string): Observable<{ results: Character[] }> {
    return this.http.get<{ results: Character[] }>(`${this.apiUrl}?name=${name}`);
  }
}
