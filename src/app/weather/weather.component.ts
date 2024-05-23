import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  searchForm!: FormGroup;
  apiResult:any;
  
  constructor(private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      city: ['', [Validators.required]],

    })
  }
  search() {
    console.log("here object", this.searchForm.value);
    this.weatherService.search(this.searchForm.value).subscribe((result)=>{
      console.log('here reponse from API',result.apiRes);
    this.apiResult = result.apiRes;
    })

    
  }}
