import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css'],
})
export class AddPlayerComponent implements OnInit {
  playerForm!: FormGroup;
  player: any = {};
  teamsTab: any = [];
  teamId: any;
  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    // get all teams from DB
    // affect all teams into teamsTab attribute
    this.teamService.getAllTeams().subscribe(
      (res)=>{
        this.teamsTab = res.teams;
      }
    )
  }

  addPlayer() {
    this.player.tId = this.teamId;   
    this.playerService.addPlayer(this.player).subscribe((data) => {
      console.log('Here response after adding player', data.isAdded);
    });
  }

  selectTeamId(evt: any) {
    this.teamId = evt.target.value;
  }
}
