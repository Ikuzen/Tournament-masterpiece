import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private router: Router) { }
  calculateAge(date: string) { // birthday is a date
    let difference = Date.parse(date);
    return Math.round((Date.now() - difference)/ (1000 * 60 * 60 * 24 * 365.25));
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }}
