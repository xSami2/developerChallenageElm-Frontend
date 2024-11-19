import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {CarShowroom} from '../interface/CarShowroom';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {CarShowroomService} from '../service/CarShowroomService';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgIf, NgForOf],  // Import necessary modules
  templateUrl: './app.component.html',
})
export class AppComponent {





}



