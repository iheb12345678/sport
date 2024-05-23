import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamURL: string = 'http://localhost:3000/api/teams';

  constructor(private httpClient: HttpClient) {}

  addTeam(teamObj: any) {
    return this.httpClient.post<{ isAdded: boolean}>(this.teamURL, teamObj);
  }

  getAllTeams() {
    return this.httpClient.get<{teams:any}>(this.teamURL);
  }

  getTeamById(id: any) {
    // http://localhost:3000/api/teams/1
    return this.httpClient.get(`${this.teamURL}/${id}`);
  }

  deleteTeam(id: any) {
    return this.httpClient.delete(`${this.teamURL}/${id}`);
  }

  updateTeam(teamObj: any) {
    return this.httpClient.put(this.teamURL, teamObj);
  }

  getAllTeamsWithPlayers(){
    return this.httpClient.get<{ teams: any }>
    ("http://localhost:3000/api/teamsPlayers");
  }
}
