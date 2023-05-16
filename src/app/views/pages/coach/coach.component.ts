import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  fullName: string;
  image: string;
  stages: any;
  tickets?: Ticket[]; // This is the new addition
}

interface Ticket {
  name: string;
  stage: string;
  daysInStage: number;
  createdBy: string;
  dateOfLastEmail: string;
  dateCreated: string;
}

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  users: User[] = [];
  showDetailIndex: number | null = null;

  constructor(
    private http: HttpClient
  ) {}

ngOnInit(): void {
  this.http.get('https://sd-api-isd.clarkoutsourcing.com/getallusers').subscribe( (res: any) => {
    this.users = Object.keys(res).map(key => ({
      email: key,
      fullName: res[key].fullName,
      image: res[key].image,
      stages: res[key].stages,
    }));
  })
}

  toggleDetail(index: number): void {
    this.showDetailIndex = this.showDetailIndex === index ? null : index;
  }
}
