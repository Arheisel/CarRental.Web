import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RentalDto } from 'src/app/API/models/rentalDto';
import { CustomersService } from 'src/app/API/services/customers.service';
import Swal from 'sweetalert2';
import { RentalEditComponent } from '../rental-edit/rental-edit.component';
import Popup from 'src/app/core/utils/popup';
import { RentalsService } from 'src/app/API/services/rentals.service';
import { CustomerCacheService } from 'src/app/core/services/customerCache.service';

@Component({
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalListComponent implements OnInit {

  public rentals = signal<RentalDto[]>([]);

  constructor(
    private router: Router,
    private customersService: CustomersService,
    private rentalService: RentalsService,
    private dialog: MatDialog,
    private customerCacheService: CustomerCacheService
  ) { }

  ngOnInit(): void {
    if (this.customerCacheService.customerId){
      this.getRentals(this.customerCacheService.customerId);
    }
    else {
      Swal.fire({
        title: 'Please enter your ID Number',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        inputValidator: (value) => {
          if (!value) return "Your ID is required to continue";
          else return;
        },
        showCancelButton: false,
        backdrop: true,
        allowOutsideClick: () => false
      }).then((result) => {
        this.customerCacheService.customerId = result.value;
        this.getRentals(result.value);
      });
    }
  }

  private getRentals(customerId: string) {
    this.customersService.getRentals(customerId).subscribe(rentals => this.rentals.set(
      rentals.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    ));
  }

  public editRental(rental: RentalDto) {
    const config = new MatDialogConfig();
    config.data = rental;

    const dialog: MatDialogRef<RentalEditComponent, RentalDto> = this.dialog.open(RentalEditComponent, config);

    dialog.afterClosed().subscribe(newRental => {
      if (newRental) {
        this.rentals.update(rentals => rentals.map(r => r.id == newRental.id ? newRental : r));
      }
    });
  }

  public cancelRental(rental: RentalDto) {
    Popup.question('Are you sure you want to cancel this reservation?', rental.car.model, 'Yes', 'No').then((res) => {
      if (res.isConfirmed) {
        this.rentalService.cancelRental(rental.id).subscribe(newRental => {
          Popup.success('Rental Cancelled');
          this.rentals.update(rentals => rentals.map(r => r.id == newRental.id ? newRental : r));
        });
      }
    });
  }

}
