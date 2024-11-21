import { Injectable } from '@angular/core';
import {CarShowroom} from '../interface/CarShowroom';
import axios from 'axios';
import {Car} from '../interface/Car';
import {catchError, from, map} from 'rxjs';
import {pagebleObject} from '../interface/pagebleObject';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  pagableObject:pagebleObject<Car> = new pagebleObject<Car>();
  carShowroomList:CarShowroom[] = []
  filteredCarShowroom:CarShowroom[] = [];
  tableData:CarShowroom[] = []




  constructor() {}


  async getCrShowroomNamesList() {
    try {
      const response = await axios.get('http://localhost:9090/carshowroom/names');
      this.carShowroomList = response.data.data;
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  async getAllCarByCarshowroom(carShowroomId: string | any) {
    try {
      const response = await axios.get(`http://localhost:9090/car/byCarshowroom/${carShowroomId}`);
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }



  async getAllCar(page:number = 0 , size:number = 10) {
    try {
      const response = await axios.get('http://localhost:9090/car', {
        params: {
          page: page,
          size: size,
        }
      });
      this.tableData = response.data.data.content;
      this.pagableObject = response.data.data;
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  async saveCar(newCar :Car) {
    try {
      const response = await axios.post('http://localhost:9090/car' , newCar);
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }


   async filterCars(car:Car) {
     try {
       const response = await axios.get('http://localhost:9090/cars/filter', {
         params: {
           maker: car.maker ,
           model: car.model ,
           modelYear: car.modelYear,
           carShowroom: car.carShowroom ,
           price: car.price,
         }
       });
       return response;
     } catch (error) {
       console.error('Error occurred:', error);
       throw error;
     }


  }






}
