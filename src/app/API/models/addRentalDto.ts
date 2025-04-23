export interface AddRentalDto {
  customerId: string;
  customerName: string;
  customerAddress: string;
  carId: string;
  startDate: Date | string;
  endDate: Date | string;
}