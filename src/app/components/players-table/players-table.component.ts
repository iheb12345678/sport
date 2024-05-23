import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { deleteObject } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css'],
})
export class PlayersTableComponent implements OnInit {
  playersTab: any = [];
  teamsTab: any = [];
  constructor(private pService: PlayerService) {}

  ngOnInit(): void {
    this.pService.getAllPlayersWithTeamInfo().subscribe((result) => {
      console.log('Here all players from BE', result.players);
      this.playersTab = result.players;
    });
  }

  searchTeamById(id: number) {
    return this.teamsTab.find((t: any) => t.id == id);
  }

  deletePlayer(id: number) {
    deleteObject(this.playersTab, 'players', id);
  }
}
