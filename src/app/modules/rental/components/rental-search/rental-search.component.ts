import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CarDto } from 'src/app/API/models/carDto';
import { CarsService } from 'src/app/API/services/cars.service';
import { AddRentalData } from '../../models/addRentalData';
import { RentalAddComponent } from '../rental-add/rental-add.component';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

  public searchForm: FormGroup;
  public types: string[] = [];
  public results = new Subject<CarDto[]>();

  constructor(private carsService: CarsService, fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = fb.group({
      type: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carsService.getTypes().subscribe(types => this.types = types);
  }

  search() {
    if (this.searchForm.invalid) return;

    const value = this.searchForm.value;
    this.carsService.search(value.type, value.startDate, value.endDate).subscribe(res => this.results.next(res));
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
