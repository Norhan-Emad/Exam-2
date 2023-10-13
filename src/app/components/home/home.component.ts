import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { Category } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private _ProductsService:ProductsService , private _CartService:CartService ,private _ToastrService: ToastrService , private _WishService:WishService) { }
  productData:any[]=[];
  categoryData:Category[]=[];
  termInput:string ="";
  productId:string="";
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response)=>{
        console.log(response);
        this.productData = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._ProductsService.getCategory().subscribe({
      next:(response)=>{
        console.log(response);
        this.categoryData = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  catOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    // autoplayTimeout:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items:3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    // autoplayTimeout:1000,
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
        this._ToastrService.success(response.message);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
