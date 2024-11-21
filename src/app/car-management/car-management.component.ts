import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Car} from '../../interface/Car';
import {CarShowroom} from '../../interface/CarShowroom';
import {CarService} from '../../service/CarService';
import Swal from 'sweetalert2';
import {filter} from 'rxjs';

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
  dialogMode:String = "";
  filterApplied:Car = new Car()

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
    await this.carService.getAllCar(0, 10)
    await this.carService.getCrShowroomNamesList()

  }

 async createDialog(dialogElementCar:HTMLDialogElement) {
    this.dialogMode = "Create"
   dialogElementCar.showModal()
  }

  closeDialog(dialogElementCar:HTMLDialogElement , form:any) {
    form.reset()
    dialogElementCar.close()
  }

  async submitCarForm(newCar: Car, form: any , dialogElementCar:HTMLDialogElement) {

    try{
      let responses = await this.carService.saveCar(newCar)
      console.log(responses)

     if (responses.status === 200) {
        this.Toast.fire({
          icon: 'success',
          title: 'Created Car  successfully',
        });
        this.carService.pagableObject.content.push(responses.data.data);  // Add to the list
        form.reset();
       dialogElementCar.close()

      }
      console.log(responses)

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
    if(this.selectedCarShowroomId === "none"){
      console.log(this.carService.tableData)
        this.carService.pagableObject.content = this.carService.tableData
    }else{
      let res = await this.carService.getAllCarByCarshowroom(this.selectedCarShowroomId)
      this.carService.pagableObject.content = res.data.data
    }



  }

  removeFiliterCarByShowroom(){
     this.carService.pagableObject.content = this.carService.tableData
  }

   navigateToPage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.carService.pagableObject.totalPages) {
      return;
    }

    let res = this.carService.getAllCar(pageNumber, 10)
  }

  searchForm(dialogElementFiliter:HTMLDialogElement) {
    dialogElementFiliter.showModal()
  }

 async ApplySearch(fiilter:Car , form:any ,  dialogElementFiliter:HTMLDialogElement) {
   if (typeof fiilter.carShowroom == "string") {
     let res = await this.carService.filterCars(fiilter)
     dialogElementFiliter.close()
     this.carService.pagableObject.content = res.data.data
     form.reset();


   } else {
     fiilter.carShowroom = null
     let res = await this.carService.filterCars(fiilter)
     dialogElementFiliter.close()
     this.carService.pagableObject.content = res.data.data
     form.reset();

   }



  }


}
