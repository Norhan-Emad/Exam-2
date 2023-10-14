import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  constructor(private _wishService:WishService , private _CartService:CartService , private _ToastrService:ToastrService){}
  wishData:any;
  ngOnInit(): void {
    this._wishService.getWishData().subscribe({
      next:({data})=>{
        console.log(data);
        this.wishData = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  };
  remove(Id:any):void{
    this._wishService.removeProduct(Id).subscribe({
      next:({data})=>{
        console.log(data);
        this.wishData = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  };
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


}
