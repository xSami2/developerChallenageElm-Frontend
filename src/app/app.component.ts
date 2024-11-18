import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CarShowroom} from '../interface/CarShowroom';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {CarShowroomService} from '../service/CarShowroomService';
import Swal from 'sweetalert2'
import {Element} from '@angular/compiler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NgIf, NgForOf],  // Import necessary modules
  templateUrl: './app.component.html',
})
export class AppComponent {

  registrationNumberErrorMsgVisbility:boolean = false
  newCarShowroom: CarShowroom = new CarShowroom();
  carShowroomList: CarShowroom[] = []
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
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

  ngOnInit() {
    this.carShowroomService.getAllCarShowroom().subscribe(
      (carShowrooms: CarShowroom[]) => {
        this.carShowroomList = carShowrooms;
      }
    )
  }

  async onCreateCarShowroom(carShowroom: CarShowroom, form: any , dialog:HTMLDialogElement) {
    try {
      const response = await this.carShowroomService.createCarShowroom(carShowroom);

      if (response.status === 200) {
        this.Toast.fire({
          icon: 'success',
          title: 'Updated Car showroom successfully',
        });
        form.reset();
        dialog.close()


      } else if (response.status === 201) {
        this.Toast.fire({
          icon: 'success',
          title: 'Created Car showroom successfully',
        });
        this.carShowroomList.push(response.data.data);  // Add to the list
        form.reset();
        dialog.close()

      }

    } catch (error) {
      this.registrationNumberErrorMsgVisbility = true
      this.Toast.fire({
        icon: 'error',
        title: 'Commercial Registration Number is already taken',
      });
    }
  }

  createDialog(dialogElement:HTMLDialogElement) {
    this.registrationNumberErrorMsgVisbility = false
    dialogElement.showModal()
  }
  closeDialog(dialogElement:HTMLDialogElement , form:any) {
    form.reset()
    dialogElement.close()
  }

  viewCarShowroom(carShowroom: CarShowroom) {
    console.log(carShowroom)
  }



}
