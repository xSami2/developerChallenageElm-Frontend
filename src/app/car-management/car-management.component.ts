import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Car} from '../../interface/Car';
import {CarShowroom} from '../../interface/CarShowroom';
import {CarService} from '../../service/CarService';

@Component({
  selector: 'app-car-management',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: 'car-management.component.html',
})
export class CarManagementComponent {


  constructor(protected carService: CarService) {};




  newCar:Car = new Car()
  carShowroomNamesList:String[] = []
  dialogMode:String = "";

 async createDialog(dialogElement:HTMLDialogElement) {
    this.dialogMode = "Create"
    let responses = await this.carService.getcCrShowroomNamesList()
    this.carShowroomNamesList = responses.data.data;
   console.log(this.carShowroomNamesList)
    dialogElement.showModal()
  }

  closeDialog(dialogElement:HTMLDialogElement , form:any) {
    form.reset()
    dialogElement.close()
  }

  async submitCarForm(carShowroom: Car, form: any , dialog:HTMLDialogElement) {
    console.log(carShowroom)
  }

}
