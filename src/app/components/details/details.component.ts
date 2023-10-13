import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivtedRoute:ActivatedRoute ,private _ProductsService:ProductsService
    ,private _CartService:CartService ,private _ToastrService: ToastrService , private _WishService:WishService){}

  detailsData:any ={};
  productId:any ;
  ngOnInit(): void {
  this._ActivtedRoute.paramMap.subscribe({
    next:(param)=>{
      this.productId = param.get("id");
    }
  })

  this._ProductsService.getDetails(this.productId).subscribe({
    next:(response)=>{
      console.log(response.data);
      this.detailsData = response.data ;
    },
    error:(err)=>{
      console.log(err);
    },
  })
  }

  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  AddToCart(Id:string):void{
    this._CartService.AddCart(Id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  AddToWish(Id:string):void{
    this._WishService.AddWish(Id).subscribe({
      next:(response)=>{
        console.log(response);
        this.detailsData = response.data;
        this._ToastrService.success(response.message);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
