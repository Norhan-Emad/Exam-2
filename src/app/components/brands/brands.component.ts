import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  constructor(private _BrandService:BrandService){}
  brandsData:any;
  ngOnInit(): void {
      this._BrandService.getBrands().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.brandsData = response.data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

}
