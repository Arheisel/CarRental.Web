import { Component, Inject } from '@angular/core';
import { AddRentalData } from '../../models/addRentalData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalsService } from 'src/app/API/services/rentals.service';
import { AddRentalDto } from 'src/app/API/models/addRentalDto';
import Popup from 'src/app/core/utils/popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.scss']
})
export class RentalAddComponent {

  public form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddRentalData,
    private dialogRef: MatDialogRef<RentalAddComponent>,
    fb: FormBuilder,
    private rentalsService: RentalsService,
    private router: Router
  ) {
    this.form = fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      address: [null, Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;
    const dto = <AddRentalDto>{
      customerId: value.id,
      customerName: value.name,
      customerAddress: value.address,
      carId: this.data.car.id,
      startDate: this.data.startDate,
      endDate: this.data.endDate
    }

    this.rentalsService.registerRental(dto).subscribe(() => {
      Popup.success("Reservation addded").then(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('/rentals/list', { state: { customerId: value.id } })
      });
    });
  }

}
