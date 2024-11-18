import {Car} from './Car';

export class CarShowroom {
  id?: string;
  name: string;
  commercialRegistrationNumber: string;
  managerName?: string;
  contactNumber: string;
  address?: string;
  carList?: Car[];

  constructor() {
    this.name = "";
    this.commercialRegistrationNumber = "";
    this.contactNumber = "";
  }



}
