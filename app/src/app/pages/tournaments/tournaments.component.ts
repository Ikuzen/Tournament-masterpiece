import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
  }

}
