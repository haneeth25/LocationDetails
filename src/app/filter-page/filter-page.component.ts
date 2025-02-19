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

    this.http.post<relatedAddressInterface[]>(`http://localhost:8080/filter`,completeAddress).subscribe(
      (data)=> {
        this.allRelatedAddress = data;
        console.log(data)
      }
    )
  }
  

}
