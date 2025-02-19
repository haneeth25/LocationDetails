import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { relatedAddressInterface } from '../models/relatedAddressInterface';

@Component({
  selector: 'app-filter-page',
  standalone: false,
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.scss'
})
export class FilterPageComponent implements OnInit{
  address: string = '';
  city: string = '';
  country: string = '';
  allRelatedAddress:relatedAddressInterface[] = [];
  dataAvailable : String = "searching";
  constructor(private activatedRoute:ActivatedRoute,private route:Router,private http:HttpClient){

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.address = params['address'];
      this.city = params['city'];
      this.country = params['country'];
      if (this.address || this.city || this.country){
        this.getRelatedAddress();
      }
    });
  
  }

  getRelatedAddress(){

    let completeAddress = {
      "address" : this.address,
      "city":this.city,
      "country":this.country
    }

    this.http.post<relatedAddressInterface[]>(`https://locationdetails-deployment.onrender.com/filter`,completeAddress).subscribe(
      (data)=> {
        this.allRelatedAddress = data;
        if(this.allRelatedAddress.length === 0){
          this.dataAvailable = "not found";
        }
        else{
          this.dataAvailable = "found"
        }
        console.log(data)
      }
    )
  }
  inDetail(lat:String,lon:String){
    this.route.navigate(["/detail"],{queryParams:{"lat":lat,"lon":lon}})

  }

}
