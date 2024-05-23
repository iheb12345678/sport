import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css'],
})
export class MatchInfoComponent implements OnInit {
  id!: number;
  match: any;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private mService:MatchesService) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.mService.getMatchById(this.id).subscribe(
      (res)=>{
       this.match = res.match;
      }
    )
  }
}
