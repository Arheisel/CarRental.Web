import { CarDto } from "./carDto";
import { CustomerDto } from "./customerDto";

export interface RentalDto {
  id: string;
  startDate: string;
  endDate: string;
  customer: CustomerDto;
  car: CarDto;
  status: string;
}