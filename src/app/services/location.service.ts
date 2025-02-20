import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nearByPlacesInterface } from '../models/nearByPlacesInterface';
import { weatherAndLocationInterface } from '../models/weatherAndLocationInterface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http:HttpClient) { }

  getNearbyDetails(lat:String,lon:String){
    let requestBody = {
      "lat":lat,
      "lon":lon
    }
    return this.http.post<nearByPlacesInterface[]>("https://locationdetails-deployment.onrender.com/detail",requestBody)

  }
  getWeatherAndLocation(lat:String,lon:String){
    let requestBody = {
      "lat":lat,
      "lon":lon
    }
    return this.http.post<weatherAndLocationInterface>("https://locationdetails-deployment.onrender.com/locationAndWeather",requestBody)
  }
}
