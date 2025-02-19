import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  lat: number | null = null;
  lon: number | null = null;
  errorMessage: string = '';

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.router.navigate(["/detail"],{queryParams:{"lat":this.lat,"lon":this.lon}})
          console.log(`Latitude: ${this.lat}, Longitude: ${this.lon}`);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      this.errorMessage = "Geolocation is not supported by this browser.";
    }
  
  }
}

