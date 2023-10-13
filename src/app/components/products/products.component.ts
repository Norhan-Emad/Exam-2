import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(private _ProductsService:ProductsService){}
  productData:any[]=[];
  productId:string="";
  termInput:string ="";
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        console.log(response);
        this.productData = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



}
