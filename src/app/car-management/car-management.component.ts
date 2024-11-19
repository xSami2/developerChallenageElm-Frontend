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
  carShowroomsNameList:CarShowroom[] = []
  carList:Car[] = []
  dialogMode:String = "";

  ngOnInit() {
    this.carService.getAllCar().subscribe(
      (carList: Car[]) => {
        this.carList = carList;
      }
    )
  }

 async createDialog(dialogElement:HTMLDialogElement) {
    this.dialogMode = "Create"
    let responses = await this.carService.getcCrShowroomNamesList()
    this.carShowroomsNameList = responses.data.data;
   console.log(this.carShowroomsNameList)
    dialogElement.showModal()
  }

  closeDialog(dialogElement:HTMLDialogElement , form:any) {
    form.reset()
    dialogElement.close()
  }

  async submitCarForm(newCar: Car, form: any , dialog:HTMLDialogElement) {
    console.log(newCar)
   let respones = await this.carService.saveCar(newCar)
    console.log(newCar)
    console.log(respones)
  }

}
