import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  calculateAge(date: string) { // birthday is a date
    let difference = Date.parse(date);
    return Math.round((Date.now() - difference)/ (1000 * 60 * 60 * 24 * 365.25));
  }
}
