import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  items: MenuItem[];
  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  navigate(link: any) {
    this.router.navigate([link]);
  }
}
