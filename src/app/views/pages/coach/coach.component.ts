import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  fullName: string;
  image: string;
  stages: any;
  averageIncomingToCompletedHr: number;
  tickets?: Ticket[];
  averageResponseTime: any;
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
  clearInterval:any;
  lastUpdate: Date;
  constructor(
    private http: HttpClient
  ) {
    this.fetch();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.clearInterval = setInterval(() => {
      this.fetch();
    }, 300000);
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

  fetch() {
    /** Get all users including their assigned tickets */
    this.http.get('https://sd-api-isd.clarkoutsourcing.com/getallusers').subscribe((res: any) => {
      const userData = res.data;
      this.users = Object.keys(userData).map(key => {
        const tickets = userData[key].data.map((ticket: any) => ({
          name: ticket.name,
          stageName: ticket.stageName,
          daysInStage: ticket.daysInStage,
          firstEmailSentTimestamp: ticket.firstEmailSentTimestamp ? new Date(ticket.firstEmailSentTimestamp) : null,
          lastEmailUpdatedTimestamp: ticket.lastEmailUpdatedTimestamp ? new Date(ticket.lastEmailUpdatedTimestamp) : null,
          creationTimestamp: ticket.creationTimestamp ? new Date(ticket.creationTimestamp) : null,
          firstEmailResponseTime: ticket.firstEmailResponseTime,
        }));
        this.lastUpdate = new Date();
        return {
          email: key,
          fullName: userData[key].fullName,
          image: userData[key].image,
          stages: userData[key].stages,
          averageIncomingToCompletedHr: userData[key].averageIncomingToCompletedHr,
          tickets: tickets,
          averageResponseTime: userData[key].averageResponseTime,
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
    }
  }
}
