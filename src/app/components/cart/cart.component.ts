import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
constructor(private _CartService:CartService){}
  cartData:any;
  countNum:any;
  ngOnInit(): void {
    this._CartService.getCartData().subscribe({
      next:({data})=>{
        console.log(data);
        this.cartData = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  };
  remove(Id:string):void{
    this._CartService.removeProduct(Id).subscribe({
      next:({data})=>{
        console.log(data);
        this.cartData = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  changeCount(Id:string , Num:number):void{
    if(Num >= 1){
      this._CartService.updateCount(Id , Num).subscribe({
        next:({data})=>{
          console.log(data);
          this.cartData = data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
