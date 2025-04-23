import { CarDto } from "src/app/API/models/carDto";

export interface AddRentalData {
  car: CarDto;
  startDate: Date;
  endDate: Date;
}