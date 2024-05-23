import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { deleteObject } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css'],
})
export class MatchesTableComponent implements OnInit {
  matchesNbr: number = 10;
  matchesTab: any = [];

  constructor(private router: Router, private matchService: MatchesService) {}

  ngOnInit() {
    // this.matchesTab = JSON.parse(localStorage.getItem('matches') || '[]');
    this.getAllMatches();
  }

  getAllMatches() {
    this.matchService.getAllMatches().subscribe((res) => {
      console.log(res.matches);
      this.matchesTab = res.matches;
    });
  }

  display(id: number) {
    this.router.navigate([`matchInfo/${id}`]);
  }

  editMatch(id: number) {
    this.router.navigate([`editMatch/${id}`]);
  }

  deleteMatch(id: number) {
    // deleteObject(this.matchesTab ,'matches', id);
    this.matchService.deleteMatch(id).subscribe((result) => {
      console.log("here response after delete",result.message);
      this.getAllMatches();
    });
  }

  resultStyle(s1: number, s2: number) {
    if (s1 > s2) {
      return ['green', 'Winner, Congrats'];
    } else if (s1 < s2) {
      return ['red', 'Loser, Hard Luck'];
    } else {
      return ['blue', 'Draw Match'];
    }
  }
}
