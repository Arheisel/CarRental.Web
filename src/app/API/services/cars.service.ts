import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDto } from '../models/carDto';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private controllerURL = environment.ApiUrl + '/Cars';
  private typesCache?: Observable<string[]>;

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<string[]> {
    if (!this.typesCache) this.typesCache = this.http.get<string[]>(`${this.controllerURL}/types`).pipe(shareReplay());
    return this.typesCache;
  }

  public search(type: string, startDate: Date, endDate: Date): Observable<CarDto[]> {
    const params = {
      type,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString()
    };

    return this.http.get<CarDto[]>(`${this.controllerURL}/search`, { params });
  }

  public isAvailable(carId: string, startDate: Date, endDate: Date, rentalId?: string): Observable<boolean> {
    const params: { [key: string]: string } = {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString()
    };
    if (rentalId) params['rentalId'] = rentalId;

    return this.http.get<boolean>(`${this.controllerURL}/${carId}/isAvailable`, { params });
  }
}
