import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css'],
})
export class TeamsTableComponent implements OnInit {
  teamsTab: any = [];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getAllTeamsWithPlayers().subscribe((result) => {
      console.log('Here all teams from BE', result.teams);
      this.teamsTab = result.teams;
    });
  }
}
