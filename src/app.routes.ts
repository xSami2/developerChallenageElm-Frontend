import { Routes } from '@angular/router';
import { CarManagementComponent } from './app/car-management/car-management.component';
import { CarShowroomManagementComponent } from './app/car-showroom-management/car-showroom-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'car-management', component: CarManagementComponent },
  { path: 'car-showroom-management', component: CarShowroomManagementComponent },
];
