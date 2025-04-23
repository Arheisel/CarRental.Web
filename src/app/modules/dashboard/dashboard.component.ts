import { Component, OnInit, signal } from '@angular/core';
import { CarServiceReportDto } from 'src/app/API/models/carServiceReportDto';
import { ReportsService } from 'src/app/API/services/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public services = signal<CarServiceReportDto[]>([]);

    constructor(private reportsService: ReportsService) {}

    ngOnInit(): void {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 14);

      this.reportsService.getCarsWithServices(today, endDate).subscribe(report => this.services.set(report));
    }

}
