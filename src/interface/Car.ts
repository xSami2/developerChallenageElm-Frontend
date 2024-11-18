import {CarShowroom} from "./CarShowroom";

export interface Car {
  uuid: string;
  maker: string;
  model: string;
  modelYear: number;
  price: number;
  carShowroom: CarShowroom;
  created_at?: Date;
  updated_at?: Date;
}
