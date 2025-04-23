import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerCacheService {

  private _customerId: string | null = null;

  public get customerId(): string | null {
    if (!this._customerId) this._customerId = sessionStorage.getItem('customerId');
    return this._customerId ?? null;
  }

  public set customerId(value: string) {
    this._customerId = value;
    sessionStorage.setItem('customerId', value);
  }

}
