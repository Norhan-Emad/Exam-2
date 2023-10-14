import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(private _ProductsService:ProductsService , private _CartService:CartService
      ,private _ToastrService: ToastrService , private _WishService:WishService){}
  productData:any[]=[];
  productId:string="";
  termInput:string ="";
  wishList:any[]=[];
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        console.log(response);
        this.productData = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    }),

    this._WishService.getWishData().subscribe({
      next:(response)=>{
        const newData = response.data.map((item:any)=>item._id)
        this.wishList =newData ;
      }
    })
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
        this._ToastrService.success(response.message);
        this.wishList =response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
