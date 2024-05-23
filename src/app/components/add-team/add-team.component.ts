import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
})
export class AddTeamComponent implements OnInit {
  teamForm!: FormGroup;
  team: any = {};
  constructor(private tService: TeamService, private router: Router) {}

  ngOnInit(): void {}

  addTeam() {
    console.log('Here team Object', this.team);
    this.tService.addTeam(this.team).subscribe((data) => {
      console.log('Here response', data);
      this.router.navigate(['admin']);
    });
  }
}
