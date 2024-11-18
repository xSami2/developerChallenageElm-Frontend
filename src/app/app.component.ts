import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CarShowroom} from '../interface/CarShowroom';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {CarShowroomService} from '../service/CarShowroomService';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NgIf, NgForOf],  // Import necessary modules
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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

  async onCreateCarShowroom(carShowroom: CarShowroom, form: any) {
    try {
      const response = await this.carShowroomService.createCarShowroom(carShowroom);

      if (response.status === 200) {
        this.Toast.fire({
          icon: 'success',
          title: 'Updated Car showroom successfully',
        });
        form.reset();


      } else if (response.status === 201) {
        this.Toast.fire({
          icon: 'success',
          title: 'Created Car showroom successfully',
        });
        this.carShowroomList.push(response.data.data);  // Add to the list
        form.reset();

      }

    } catch (error) {
      this.Toast.fire({
        icon: 'error',
        title: 'Commercial Registration Number is already taken',
      });
    }
  }



}
