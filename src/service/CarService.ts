import { Injectable } from '@angular/core';
import {CarShowroom} from '../interface/CarShowroom';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }


  async getcCrShowroomNamesList() {
    try {
      const response = await axios.get('http://localhost:9090/carshowroom/names');
      return response;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

}
