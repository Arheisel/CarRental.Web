import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilizationByTypeReportDto } from 'src/app/API/models/utilizationByTypeReportDto';
import { ReportsService } from 'src/app/API/services/reports.service';

@Component({
  selector: 'app-statistics-utilization',
  templateUrl: './statistics-utilization.component.html',
  styleUrls: ['./statistics-utilization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsUtilizationComponent {

  public dateForm: FormGroup;
  public types = signal<UtilizationByTypeReportDto[]>([]);

  constructor(private reportsService: ReportsService, fb: FormBuilder) {
    this.dateForm = fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  showStatistics(): void {
    if (this.dateForm.invalid) return;

    const value = this.dateForm.value;

    this.reportsService.getRentalsByType(value.startDate, value.endDate).subscribe(report => {
      report = report.sort((a, b) => b.percentage - a.percentage).map(t => {
        t.percentage = Math.round(t.percentage * 100);
        return t;
      })

      this.types.set(report);
    });
  }

}
