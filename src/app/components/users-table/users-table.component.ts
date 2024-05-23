import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  usersTab:any=[];
  constructor() { }

  ngOnInit(): void {
    this.usersTab = JSON.parse(localStorage.getItem("users") || "[]");
  }
 
}
