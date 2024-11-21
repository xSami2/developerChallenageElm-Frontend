import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import Swal from 'sweetalert2'
import {CarShowroom} from '../../interface/CarShowroom';
import {CarShowroomService} from '../../service/CarShowroomService';
import {pagebleObject} from '../../interface/pagebleObject';
import {Car} from '../../interface/Car';

@Component({
  selector: 'app-car-showroom-management',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgIf, NgForOf],  // Import necessary modules
  templateUrl: './car-showroom-management.component.html',
})
export class CarShowroomManagementComponent {





  sortFilter: string = 'name,asc';

  nameSortVisibility:boolean = false;
  commercialRegistrationNumberSortVisibility:boolean = false;
  contactNumberSortVisibility:boolean = false;

  ascSortName:boolean = false;
  ascSortCommercialRegistrationNumber:boolean = false;
  ascSortContactNumber:boolean = false;

  dialogMode:String = "";
  commercialRegistrationNumberErrorMsg:boolean = false
  newCarShowroom: CarShowroom = new CarShowroom();
  carShowroomList: CarShowroom[] = []
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


  constructor(protected carShowroomService: CarShowroomService) {
  }

  async ngOnInit() {
    await this.carShowroomService.getAllCarShowroom(0,10,"name,asc")
  }

  async submitCarShowroomForm(carShowroom: CarShowroom, form: any , dialog:HTMLDialogElement) {


    try {
      const response = await this.carShowroomService.createCarShowroom(carShowroom);
      if (response.status === 200) {
        this.Toast.fire({
          icon: 'success',
          title: 'Updated Car showroom successfully',
        });
        form.reset();
        dialog.close()

        this.updateCarShowroom(response.data.data);
        this.newCarShowroom = new CarShowroom();


      } else if (response.status === 201) {
        this.Toast.fire({
          icon: 'success',
          title: 'Created Car showroom successfully',
        });
        console.log(response)
        this.carShowroomService.pagableObject.content.push(response.data.data);  // Add to the list
        form.reset();
        dialog.close()

      }

    } catch (error) {
      this.commercialRegistrationNumberErrorMsg = true
      this.Toast.fire({
        icon: 'error',
        title: 'Commercial Registration Number is already taken',
      });
    }
  }

  createDialog(dialogElement:HTMLDialogElement) {
    this.dialogMode = "Create"
    this.commercialRegistrationNumberErrorMsg = false
    dialogElement.showModal()
  }
  closeDialog(dialogElement:HTMLDialogElement , form:any) {
    form.reset()
    dialogElement.close()
  }

  async updateCarShowroomDialog(carShowroom: CarShowroom , form:any , dialog:HTMLDialogElement) {
    this.dialogMode = "Update"
    dialog.showModal()
    console.log(carShowroom.id)
    let response = await this.carShowroomService.getCarShowroomById(carShowroom.id);
    this.newCarShowroom = response.data.data;
  }

  async viewCarShowroomDialog(carShowroom: CarShowroom , form:any , dialog:HTMLDialogElement) {
    this.dialogMode = "View"
    dialog.showModal()
    let response = await this.carShowroomService.getCarShowroomById(carShowroom.id);
    this.newCarShowroom = response.data.data;
  }

  async deleteCarShowroom(carShowroomId: string | undefined) {
    let response = await this.carShowroomService.deleteCarShowroomById(carShowroomId);
    if (response.status === 200) {
      const index = this.carShowroomService.pagableObject.content.findIndex((showroom:CarShowroom) => showroom.id === carShowroomId);
      this.carShowroomService.pagableObject.content.splice(index, 1);
      this.Toast.fire({
        icon: 'success',
        title: 'Deleted Car showroom successfully',
      });
    }
  }

  async sortByName()  {
    this.nameSortVisibility = true;
    if (this.ascSortName){
      let respones = await this.carShowroomService.getAllCarShowroom(this.carShowroomService.pagableObject.number,10,"name,asc")
      this.carShowroomService.pagableObject = respones.data.data
      console.log(respones)
    }else{
      let respones = await this.carShowroomService.getAllCarShowroom(this.carShowroomService.pagableObject.number,10,"name,desc")
      this.carShowroomService.pagableObject = respones.data.data
      console.log(respones)

    }
    this.ascSortName = !this.ascSortName
  }

  async sortByCommercialRegistrationNumber()  {
    this.commercialRegistrationNumberSortVisibility = true
    console.log(this.carShowroomService.pagableObject)

    if (this.ascSortCommercialRegistrationNumber){
      let respones = await this.carShowroomService.getAllCarShowroom(this.carShowroomService.pagableObject.number,10,"commercialRegistrationNumber,desc")
      this.carShowroomService.pagableObject = respones.data.data
    }else{
      let respones = await this.carShowroomService.getAllCarShowroom(this.carShowroomService.pagableObject.number,10,"commercialRegistrationNumber,asc")
      this.carShowroomService.pagableObject = respones.data.data
    }
    this.ascSortCommercialRegistrationNumber = !this.ascSortCommercialRegistrationNumber


  }

  async sortByContactNumber()  {
    console.log("Gelo")
    this.contactNumberSortVisibility = true
    if (this.ascSortContactNumber){
      let respones = await this.carShowroomService.getAllCarShowroom(this.carShowroomService.pagableObject.number,10,"contactNumber,desc")
      this.carShowroomService.pagableObject = respones.data.data
    }else{
      let respones = await this.carShowroomService.getAllCarShowroom(this.carShowroomService.pagableObject.number,10,"contactNumber,asc")
      this.carShowroomService.pagableObject = respones.data.data
    }
    this.ascSortContactNumber = !this.ascSortContactNumber
  }






  updateCarShowroom(updatedShowroom: CarShowroom) {
    const index = this.carShowroomService.pagableObject.content.findIndex((showroom:CarShowroom) => showroom.id === updatedShowroom.id);
    if (index !== -1) {
      this.carShowroomService.pagableObject.content[index] = { ...this.carShowroomService.pagableObject.content[index], ...updatedShowroom };
    }
  }

  async navigateToPage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.carShowroomService.pagableObject.totalPages) {
      return;
    }

    let res = await this.carShowroomService.getAllCarShowroom( pageNumber , 10 , this.sortFilter)
    console.log(this.carShowroomService.pagableObject)
  }

}
