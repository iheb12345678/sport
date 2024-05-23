import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  infoTab: any = [
    {
      title: 'Title 1',
      name: 'Name 1',
      date: '04/04/2024',
      img: 'assets/images/img_1.jpg',
      avatar: 'assets/images/person_1.jpg',
    },
    {
      title: 'Title 2',
      name: 'Name 2',
      date: '04/04/2024',
      img: 'assets/images/img_2.jpg',
      avatar: 'assets/images/person_2.jpg',
    },
    {
      title: 'Title 3',
      name: 'Name 3',
      date: '04/04/2024',
      img: 'assets/images/img_3.jpg',
      avatar: 'assets/images/person_3.jpg',
    },
    {
      title: 'Title 4',
      name: 'Name 4',
      date: '04/04/2024',
      img: 'assets/images/img_2.jpg',
      avatar: 'assets/images/person_1.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
