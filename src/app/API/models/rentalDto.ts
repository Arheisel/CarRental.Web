import { CarDto } from "./carDto";

export interface RentalDto {
  id: string;
  startDate: string;
  endDate: string;
  car: CarDto;
  status: string;
}