import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddRentalDto } from '../models/addRentalDto';
import { Observable } from 'rxjs';
import { UpdateRentalDto } from '../models/updateRentalDto';
import { RentalDto } from '../models/rentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  private controllerURL = environment.ApiUrl + '/Rentals';

  constructor(private http: HttpClient) { }

  public registerRental(dto: AddRentalDto): Observable<RentalDto> {
    if (dto.startDate instanceof Date) dto.startDate = dto.startDate.toISOString();
    if (dto.endDate instanceof Date) dto.endDate = dto.endDate.toISOString();

    return this.http.post<RentalDto>(this.controllerURL, dto);
  }

  public modifyReservation(id: string, dto: UpdateRentalDto): Observable<RentalDto> {
    if (dto.startDate instanceof Date) dto.startDate = dto.startDate.toISOString();
    if (dto.endDate instanceof Date) dto.endDate = dto.endDate.toISOString();

    return this.http.put<RentalDto>(`${this.controllerURL}/${id}`, dto);
  }

  public cancelRental(id: string): Observable<RentalDto> {
    return this.http.delete<RentalDto>(`${this.controllerURL}/${id}`);
  }
}
