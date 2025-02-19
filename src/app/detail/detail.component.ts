import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { nearByPlacesInterface } from '../models/nearByPlacesInterface';
import { weatherAndLocationInterface } from '../models/weatherAndLocationInterface';
import { find } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{

  lat:string = ''
  lon:string = ''
  nearByPlaces:nearByPlacesInterface[]=[]
  weatherAndLocation?:weatherAndLocationInterface;
  allAmenity : String[] = [];
  selectedAmenity:String='';
  filteredPlaces:nearByPlacesInterface[]=[]
  fetchingDone:boolean = false;
  

  constructor(private activatedRoute:ActivatedRoute,private route:Router,private locationService:LocationService){

  }
  ngOnInit(): void {
    console.log("entering")
      this.activatedRoute.queryParams.subscribe((params) => {
        this.lat = params["lat"];
        this.lon = params["lon"];
        this.locationService.getNearbyDetails(this.lat,this.lon).subscribe(
          (data) => {
            this.nearByPlaces = data;
            this.filteredPlaces = data;
            this.findAllamenity(this.nearByPlaces)
            this.fetchingDone = true;
            // console.log(this.nearByPlaces);
          }
        );
        this.locationService.getWeatherAndLocation(this.lat,this.lon).subscribe(
          (data) => {
            this.weatherAndLocation = data
          }
        )

      })
  }

  findAllamenity(nearByPlaces:nearByPlacesInterface[]){
    for(let obj of nearByPlaces){
      if (!this.allAmenity.includes(obj.amenity)){
        this.allAmenity.push(obj.amenity);
      }
    }
  }

  filterPlaces(){
    if(this.selectedAmenity){
      this.filteredPlaces = this.nearByPlaces.filter((place) => place.amenity === this.selectedAmenity);
    }
    else{
      this.filteredPlaces = [...this.nearByPlaces]
    }

  }
  
}
