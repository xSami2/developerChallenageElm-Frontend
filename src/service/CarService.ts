import { Injectable } from '@angular/core';
import {CarShowroom} from '../interface/CarShowroom';
import axios from 'axios';
import {Car} from '../interface/Car';
import {catchError, from, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {



  constructor() {

  }


  async getcCrShowroomNamesList() {
    try {
      const response = await axios.get('http://localhost:9090/carshowroom/names');
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }



  getAllCar() {
    return from(
      axios.get('http://localhost:9090/car')).pipe(
      map(
        response => response.data.data
      ),
      catchError(error => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  async saveCar(newCar :Car) {
    try {
      console.log("SSS" , newCar)
      const response = await axios.post('http://localhost:9090/car' , newCar);
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

}
