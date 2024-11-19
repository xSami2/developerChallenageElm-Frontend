import {CarShowroom} from "./CarShowroom";

export class Car {
  id?: string;
  vin :string
  maker: string;
  model: string;
  modelYear: number;
  price: number;
  carShowroom: string;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
   this.vin = "";
    this.maker = "";
      this.model = "";
      this.modelYear = 0;
      this.price = 0;
    this.carShowroom = "";
  }
}
