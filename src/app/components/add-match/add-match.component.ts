import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatchesService } from 'src/app/services/matches.service';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css'],
})
export class AddMatchComponent implements OnInit {
  // match : Objet initialement vide
  match: any = {};
  // Form ID
  matchForm!: FormGroup;
  msg: string = '';
  constructor(private matchService: MatchesService) {}

  ngOnInit(): void {}

  // Méthode
  addMatch() {
    this.matchService.addMatch(this.match).subscribe((result) => {
      console.log(result.message);
      this.msg = result.message;
    });
  }
}
