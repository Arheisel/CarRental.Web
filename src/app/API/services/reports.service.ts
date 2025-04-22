import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarServiceReportDto } from '../models/carServiceReportDto';
import { UtilizationByTypeReportDto } from '../models/utilizationByTypeReportDto';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private controllerURL = environment.ApiUrl + '/Reports';

  constructor(private http: HttpClient) { }

  public getCarsWithServices(startDate: Date, endDate: Date): Observable<CarServiceReportDto[]> {
    const params = {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString()
    }

    return this.http.get<CarServiceReportDto[]>(`${this.controllerURL}/cars/services`, { params });
  }

  public getRentalsByType(startDate: Date, endDate: Date): Observable<UtilizationByTypeReportDto[]> {
    const params = {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString()
    }

    return this.http.get<UtilizationByTypeReportDto[]>(`${this.controllerURL}/rentals/byCarType`, { params });
  }
}
