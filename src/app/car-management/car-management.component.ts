import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Car} from '../../interface/Car';
import {CarShowroom} from '../../interface/CarShowroom';
import {CarService} from '../../service/CarService';
import Swal from 'sweetalert2';

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






  selectedCarShowroomId:string = ""
  newCar:Car = new Car()
  carShowroomsNameList:CarShowroom[] = []
  carList:Car[] = []
  dialogMode:String = "";

  Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  async ngOnInit() {
    this.carService.getAllCar().subscribe(
      (carList: Car[]) => {
        this.carList = carList;
      }
    )
    let responses = await this.carService.getcCrShowroomNamesList()
    console.log(responses.data)
    this.carShowroomsNameList = responses.data.data;

  }

 async createDialog(dialogElement:HTMLDialogElement) {
    this.dialogMode = "Create"
    dialogElement.showModal()
  }

  closeDialog(dialogElement:HTMLDialogElement , form:any) {
    form.reset()
    dialogElement.close()
  }

  async submitCarForm(newCar: Car, form: any , dialog:HTMLDialogElement) {
    try{
      let responses = await this.carService.saveCar(newCar)
      console.log(responses)

     if (responses.status === 201) {
        this.Toast.fire({
          icon: 'success',
          title: 'Created Car  successfully',
        });
        this.carList.push(responses.data.data);  // Add to the list
        form.reset();
        dialog.close()

      }

    }catch (error){
      this.Toast.fire({
        icon: 'error',
        title: 'Could not save Car',
      });
    }

  }

  async getAllCarByShowroom() {
    console.log(
      this.selectedCarShowroomId
    )
    let res = await this.carService.getAllCarByCarshowroom(this.selectedCarShowroomId)
    this.carList = res.data.data

  }




}
