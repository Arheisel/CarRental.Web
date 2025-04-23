import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RentalDto } from 'src/app/API/models/rentalDto';
import { CustomersService } from 'src/app/API/services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  public rentals = new Subject<RentalDto[]>();

  constructor(private router: Router, private customersService: CustomersService) { }

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras?.state;

    if (state?.['customerId']){
      this.getRentals(state['customerId']);
    }
    else {
      Swal.fire({
        title: 'Please enter youtr ID Number',
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
        this.getRentals(result.value);
      });
    }
  }

  private getRentals(customerId: string) {
    this.customersService.getRentals(customerId).subscribe(res => this.rentals.next(res));
  }

}
