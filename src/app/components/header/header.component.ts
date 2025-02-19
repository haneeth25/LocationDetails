import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  address:String='';
  city:String='';
  country:String='';

  constructor(private route:Router){

  }
  getRelatedAddress(){

    let completeAddress = {
      "address" : this.address,
      "city":this.city,
      "country":this.country
    }
    this.route.navigate(['/filter'],{queryParams : completeAddress});

  }
}
