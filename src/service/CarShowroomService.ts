import { Injectable } from '@angular/core';
import axios from 'axios';
import {CarShowroom} from '../interface/CarShowroom';
import {catchError, from, map} from 'rxjs';  // Import Axios
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CarShowroomService {

  carShowroomList: CarShowroom[]  = new Array<CarShowroom>();
  savedCarShowroom: CarShowroom = new CarShowroom();

  constructor() {
    this.getAllCarShowroom()
  }

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

  async getAllCarShowroomSorted(sortBy: string ,sortDirection:string) {
    try {
      const response = await axios.get(`http://localhost:9090/carshowroom/sorted`, {
        params:{
          sortBy:sortBy,
          sortDirection:sortDirection
        }
      });
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }


  getAllCarShowroom() {
    return from(
      axios.get('http://localhost:9090/carshowroom')).pipe(
      map(
        response => response.data.data
      ),
      catchError(error => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }
}
