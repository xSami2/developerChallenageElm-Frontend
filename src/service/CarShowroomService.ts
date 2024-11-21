import { Injectable } from '@angular/core';
import axios from 'axios';
import {CarShowroom} from '../interface/CarShowroom';
import {catchError, from, map} from 'rxjs';  // Import Axios
import Swal from 'sweetalert2'
import {Car} from '../interface/Car';
import {pagebleObject} from '../interface/pagebleObject';

@Injectable({
  providedIn: 'root'
})
export class CarShowroomService {

  carShowroomList: CarShowroom[]  = [];
  savedCarShowroom: CarShowroom = new CarShowroom();
  pagableObject:pagebleObject<CarShowroom> = new pagebleObject<CarShowroom>();


  constructor() {}



  async createCarShowroom(carShowroomData: CarShowroom) {
    try {
      const response = await axios.post('http://localhost:9090/carshowroom', carShowroomData);
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  async getCarShowroomById(carShowroomId: string | undefined) {
    try {
      const response = await axios.get(`http://localhost:9090/carshowroom/${carShowroomId}`);
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  async deleteCarShowroomById(carShowroomId: string | undefined) {
    try {
      const response = await axios.delete(`http://localhost:9090/carshowroom/${carShowroomId}`);
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  // async getAllCarShowroomSorted(pageNumber:number,sortBy: string) {
  //   console.log(pageNumber , sortBy );
  //   try {
  //     const response = await axios.get(`http://localhost:9090/carshowroom`, {
  //       params:{
  //         page: page,
  //         size: size,
  //         sortBy: sortBy
  //       }
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //     throw error;
  //   }
  // }

  async getAllCarShowroom(page:number = 0 , size:number = 10 , sortBy:string) {
    console.log("Sam")
    console.log(page , size , sortBy);
    try {
      const response = await axios.get('http://localhost:9090/carshowroom', {
        params: {
          page: page,
          size: size,
          sortBy: sortBy
        }
      });
      this.pagableObject = response.data.data;
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }




}
