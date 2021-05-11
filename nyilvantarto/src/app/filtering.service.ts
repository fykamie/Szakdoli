import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {
  public searchKey = "";
  public isShowZeroBalance = true;
  public isShowPlusBalance = true;
  public isShowMinusBalance = true;

  constructor() { }
}
