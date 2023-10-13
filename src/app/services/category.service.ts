import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient , private _NgxSpinnerService:NgxSpinnerService) { }

  getCategory():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
}
