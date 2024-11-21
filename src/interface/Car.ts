import {CarShowroom} from "./CarShowroom";

export class Car {
  id?: string;
  vehicleIdentificationNumber :string
  maker: string;
  model: string;
  modelYear: number |null;
  price: number |null;
  carShowroom: any;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
   this.vehicleIdentificationNumber = "";
    this.maker = "";
      this.model = "";
      this.modelYear = null;
      this.price = null;
    this.carShowroom = new CarShowroom();
  }
}
