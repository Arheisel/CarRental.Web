import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RentalsService } from 'src/app/API/services/rentals.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { RentalDto } from 'src/app/API/models/rentalDto';
import { forkJoin } from 'rxjs';
import { CarDto } from 'src/app/API/models/carDto';
import { CarsService } from 'src/app/API/services/cars.service';
import { UpdateRentalDto } from 'src/app/API/models/updateRentalDto';
import Popup from 'src/app/core/utils/popup';

@Component({
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalEditComponent implements OnInit {

  public form: FormGroup;
  public types = signal<string[]>([]);
  public availableCars = signal<CarDto[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RentalDto,
    private dialogRef: MatDialogRef<RentalEditComponent, RentalDto>,
    fb: FormBuilder,
    private rentalsService: RentalsService,
    private carsService: CarsService,
    destroyRef: DestroyRef
  ) {
    if (!data) console.error('Data is null!');

    this.types.set([ data.car.type ]);
    this.availableCars.set([ data.car ]);

    this.form = fb.group({
      startDate: [new Date(data.startDate), Validators.required],
      endDate: [new Date(data.endDate), Validators.required],
      type: [data.car.type, Validators.required],
      carId: [data.car.id, Validators.required],
    });

    this.form.get('startDate')?.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(this.updateCars.bind(this));
    this.form.get('endDate')?.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(this.updateCars.bind(this));
    this.form.get('type')?.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(this.updateCars.bind(this));
  }

  ngOnInit() {
    this.carsService.getTypes().subscribe(types => this.types.set(types));
    this.updateCars(false);
  }

  private updateCars(reset: boolean = true){
    const value = this.form.value;
    if (!value.startDate || !value.endDate || !value.type) return;

    if (reset) this.form.get('carId')?.reset();

    forkJoin({
      currentAvailable: this.carsService.isAvailable(this.data.car.id, value.startDate, value.endDate, this.data.id),
      carList: this.carsService.search(value.type, value.startDate, value.endDate)
    }).subscribe(res => {
      const cars = res.carList;

      if (value.type == this.data.car.type && !cars.some(c => c.id == this.data.car.id) && res.currentAvailable) {
        cars.unshift(this.data.car);
      }

      this.availableCars.set(cars);
    })
  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;
    const dto = <UpdateRentalDto>{
      carId: value.carId,
      startDate: value.startDate,
      endDate: value.endDate
    }

    this.rentalsService.modifyReservation(this.data.id, dto).subscribe(res => {
          Popup.success("Reservation updated").then(() => {
            this.dialogRef.close(res);
          });
        });
  }

  close() {
    this.dialogRef.close();
  }
}
