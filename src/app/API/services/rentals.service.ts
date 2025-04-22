import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddRentalDto } from '../models/addRentalDto';
import { Observable } from 'rxjs';
import { UpdateRentalDto } from '../models/updateRentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  private controllerURL = environment.ApiUrl + '/Rentals';

  constructor(private http: HttpClient) { }

  public registerRental(dto: AddRentalDto): Observable<void> {
    return this.http.post<void>(this.controllerURL, dto);
  }

  public modifyReservation(id: string, dto: UpdateRentalDto): Observable<void> {
    return this.http.put<void>(`${this.controllerURL}/${id}`, dto);
  }

  public cancelRental(id: string): Observable<void> {
    return this.http.delete<void>(`${this.controllerURL}/${id}`);
  }
}
