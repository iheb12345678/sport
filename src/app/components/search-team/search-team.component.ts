import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrls: ['./search-team.component.css'],
})
export class SearchTeamComponent implements OnInit {
  searchForm!: FormGroup;
  playersTab: any = [];
  teamsTab: any = [];
  team: any = {};
  foundedPlayers: any = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.playersTab = JSON.parse(localStorage.getItem('players') || '[]');
    this.teamsTab = JSON.parse(localStorage.getItem('teams') || '[]');
    this.searchForm = this.fb.group({
      teamName: ['', Validators.required],
    });
  }

  search() {
    this.team = this.teamsTab.find(
      (team: any) => team.name == this.searchForm.value.teamName
    );
    this.foundedPlayers = this.playersTab.filter(
      (player: any) => player.tId == this.team.id
    );
  }
}
