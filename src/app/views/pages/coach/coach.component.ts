import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  fullName: string;
  image: string;
  stages: any;
  tickets?: Ticket[];
  averageResponseTime?: number;
}

interface Ticket {
  name: string;
  stageName: string;
  daysInStage: number;
  firstEmailSentTimestamp: Date;
  lastEmailUpdatedTimestamp: Date;
  creationTimestamp: Date;
  firstEmailResponseTime: number;
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
    /** Get all users including their assigned tickets */
    this.http.get('https://sd-api-isd.clarkoutsourcing.com/getallusers').subscribe((res: any) => {
      this.users = Object.keys(res).map(key => {
        const tickets = res[key].data.map((ticket: any) => ({
          name: ticket.name,
          stageName: ticket.stageName,
          daysInStage: ticket.daysInStage,
          firstEmailSentTimestamp: new Date(ticket.firstEmailSentTimestamp),
          lastEmailUpdatedTimestamp: new Date(ticket.lastEmailUpdatedTimestamp),
          creationTimestamp: new Date(ticket.creationTimestamp),
          firstEmailResponseTime: ticket.firstEmailResponseTime,
        }));

        /** Computation for average first response */
        let totalResponseTime = 0;
        tickets.forEach((ticket: Ticket) => totalResponseTime += ticket.firstEmailResponseTime);

        return {
          email: key,
          fullName: res[key].fullName,
          image: res[key].image,
          stages: res[key].stages,
          tickets: tickets,
          averageResponseTime: tickets.length ? totalResponseTime / tickets.length : undefined,
        }
      });
    });
  }

  /** Toggle Button to show tickets */
  toggleDetail(index: number): void {
    this.showDetailIndex = this.showDetailIndex === index ? null : index;
  }

  /** Color change depending on time for first response */
  getResponseTimeColor(time: number | undefined): string {
    if (time === undefined) {
      return '';
    } else if (time === 0) {
      return 'white'
    } else if (time > 0 && time <= 8) {
      return 'green';
    } else if (time > 8 && time <= 16) {
      return 'yellow';
    } else if (time > 16 && time <= 24) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
