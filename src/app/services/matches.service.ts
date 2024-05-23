import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  matchUrl: string = 'http://localhost:3000/matches';

  constructor(private httpClient: HttpClient) {}

  addMatch(match: any) {
    return this.httpClient.post<{ message: any }>(this.matchUrl, match);
  }

  getAllMatches() {
    return this.httpClient.get<{ matches: any }>(this.matchUrl);
  }

  getMatchById(id: any) {
    // http://localhost:3000/matches/1
    return this.httpClient.get<{ match: any }>(`${this.matchUrl}/${id}`);
  }

  deleteMatch(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.matchUrl}/${id}`);
  }

  updateMatch(match: any) {
    return this.httpClient.put<{ message: string }>(this.matchUrl, match);
  }
}
