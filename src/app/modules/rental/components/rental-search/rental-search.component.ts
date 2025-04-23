import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CarDto } from 'src/app/API/models/carDto';
import { CarsService } from 'src/app/API/services/cars.service';
import { AddRentalData } from '../../models/addRentalData';
import { RentalAddComponent } from '../rental-add/rental-add.component';

@Component({
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalSearchComponent implements OnInit {

  public searchForm: FormGroup;
  public types = signal<string[]>([]);
  public results = signal<CarDto[]>([]);

  constructor(private carsService: CarsService, fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = fb.group({
      type: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carsService.getTypes().subscribe(types => this.types.set(types));
  }

  search() {
    if (this.searchForm.invalid) return;

    const value = this.searchForm.value;
    this.carsService.search(value.type, value.startDate, value.endDate).subscribe(cars => this.results.set(cars));
  }

  addRental(car: CarDto) {
    const value = this.searchForm.value;
    const config = new MatDialogConfig();

    config.data = <AddRentalData>{
      car,
      startDate: value.startDate,
      endDate: value.endDate
    };

    this.dialog.open(RentalAddComponent, config);
  }

}
