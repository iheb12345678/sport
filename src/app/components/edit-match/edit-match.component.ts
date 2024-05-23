import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css'],
})
export class EditMatchComponent implements OnInit {
  matchForm!: FormGroup;
  match: any = {};
  id!: number;
  matchesTab: any = [
    { id: 1, scoreOne: 0, scoreTwo: 3, teamOne: 'RMD', teamTwo: 'FCB' },
    { id: 2, scoreOne: 2, scoreTwo: 3, teamOne: 'SEV', teamTwo: 'ATM' },
    { id: 3, scoreOne: 1, scoreTwo: 0, teamOne: 'CIT', teamTwo: 'ARS' },
    { id: 4, scoreOne: 2, scoreTwo: 2, teamOne: 'JUV', teamTwo: 'ROM' },
    { id: 5, scoreOne: 2, scoreTwo: 2, teamOne: 'JUV', teamTwo: 'ROM' },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getMatchById();
  }
  getMatchById() {
    this.matchService.getMatchById(this.id).subscribe((res) => {
      this.match = res.match;
    });
  }
  editMatch() {
    console.log('Here object', this.match);
    this.matchService.updateMatch(this.match).subscribe((res) => {
      console.log('Here response after edit', res.message);
      this.router.navigate(['admin']);
    });
  }
}
