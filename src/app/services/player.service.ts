import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerURL: string = 'http://localhost:3000/api/players';

  constructor(private httpClient: HttpClient) {}

  addPlayer(player: any) {
    return this.httpClient.post<{ isAdded: boolean }>(this.playerURL, player);
  }

  getAllPlayers() {
    return this.httpClient.get<{ players: any }>(this.playerURL);
  }

  getPlayerById(id: any) {
    return this.httpClient.get(`${this.playerURL}/${id}`);
  }

  deletePlayer(id: any) {
    return this.httpClient.delete(`${this.playerURL}/${id}`);
  }

  updatePlayer(teamObj: any) {
    return this.httpClient.put(this.playerURL, teamObj);
  }

  getAllPlayersWithTeamInfo() {
    return this.httpClient.get<{ players: any }>(
      'http://localhost:3000/api/playersWithTeamInfo'
    );
  }
}
