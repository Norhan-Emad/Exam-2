import { Component, OnInit } from '@angular/core';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  constructor(private _wishService:WishService){}
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
  remove(Id:string):void{
    this._wishService.removeProduct(Id).subscribe({
      next:({data})=>{
        console.log(data);
        this.wishData = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



}
