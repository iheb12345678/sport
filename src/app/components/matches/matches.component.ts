import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matchesTab: any = [
    { id: 1, scoreOne: 0, scoreTwo: 3, teamOne: 'RMD', teamTwo: 'FCB' },
    { id: 2, scoreOne: 2, scoreTwo: 3, teamOne: 'SEV', teamTwo: 'ATM' },
    { id: 3, scoreOne: 1, scoreTwo: 0, teamOne: 'CIT', teamTwo: 'ARS' },
    { id: 4, scoreOne: 2, scoreTwo: 2, teamOne: 'JUV', teamTwo: 'ROM' },
    { id: 5, scoreOne: 0, scoreTwo: 2, teamOne: 'JUV', teamTwo: 'ROM' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
