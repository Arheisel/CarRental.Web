import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RentalDto } from '../models/rentalDto';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private controllerURL = environment.ApiUrl + '/Customers';

  constructor(private http: HttpClient) { }

  public getRentals(customerId: string): Observable<RentalDto[]> {
    return this.http.get<RentalDto[]>(`${this.controllerURL}/${customerId}/rentals`);
  }
}
