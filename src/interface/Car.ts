import {CarShowroom} from "./CarShowroom";

export class Car {
  id?: string;
  vehicleIdentificationNumber :string
  maker: string;
  model: string;
  modelYear: number;
  price: number;
  carShowroom: CarShowroom;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
   this.vehicleIdentificationNumber = "";
    this.maker = "";
      this.model = "";
      this.modelYear = 0;
      this.price = 0;
    this.carShowroom = new CarShowroom();
  }
}
