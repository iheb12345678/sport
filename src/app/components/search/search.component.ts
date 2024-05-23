import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  matchesTab: any = [
    { id: 1, scoreOne: 0, scoreTwo: 3, teamOne: 'RMD', teamTwo: 'FCB' },
    { id: 2, scoreOne: 2, scoreTwo: 3, teamOne: 'SEV', teamTwo: 'ATM' },
    { id: 3, scoreOne: 1, scoreTwo: 0, teamOne: 'CIT', teamTwo: 'ARS' },
    { id: 4, scoreOne: 2, scoreTwo: 2, teamOne: 'JUV', teamTwo: 'ROM' },
    { id: 5, scoreOne: 0, scoreTwo: 2, teamOne: 'JUV', teamTwo: 'ROM' },
  ];
  foundedMatches: any = [];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      score: ['', Validators.required],
    });
  }
  search() {
    let scoreValue = this.searchForm.value.score;
    this.foundedMatches = [];
    this.foundedMatches = this.matchesTab.filter(
      (m: any) => m.scoreOne == scoreValue || m.scoreTwo == scoreValue
    );
  }
}
