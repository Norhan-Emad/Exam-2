import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private _HttpClient:HttpClient ) { }
  mainToken:any = {
    token:localStorage.getItem("_token"),
  }

  AddWish(prodId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,
    {
    productId: prodId
  },
  {
    headers: this.mainToken
  })
  }

  getWishData():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' ,
    {
      headers: this.mainToken
    })
  }

  removeProduct(prodID:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodID}`,
    {
      headers: this.mainToken
    })
  }


}
