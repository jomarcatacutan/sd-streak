import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  showDetailIndex: number | null = null;
  users = [
    {
        name: 'Jomar Catacutan',
        incoming: 12,
        actionInProgress: 24,
        pendingClientFeedback: 4,
        completed: 8,
        onHold: 16,
        averageResolutionTime: 2.5,
        tickets: [
            {
              name: "Geiger | Meeting Topics",
              stage: "Action in Progress",
              daysInStage: 3,
              createdBy: "Randolph Asuncion",
              dateOfLastEmail: "05/26/2023",
              dateCreated: "05/12/2023"
            },
            {
              name: "TSP Wealth LLP | Client Visit",
              stage: "Pending Client Feedback",
              daysInStage: 1,
              createdBy: "Randolph Asuncion",
              dateOfLastEmail: "05/15/2023",
              dateCreated: "05/6/2023"
            }
          ]
    },
    {
        name: 'Robin Berido Jr.',
        incoming: 21,
        actionInProgress: 15,
        pendingClientFeedback: 9,
        completed: 18,
        onHold: 6,
        averageResolutionTime: 1.8,
        tickets: [
            {
              name: "Geiger | Meeting Topics",
              stage: "Action in Progress",
              daysInStage: 3,
              createdBy: "Randolph Asuncion",
              dateOfLastEmail: "05/26/2023",
              dateCreated: "05/12/2023"
            },
            {
              name: "TSP Wealth LLP | Client Visit",
              stage: "Pending Client Feedback",
              daysInStage: 1,
              createdBy: "Randolph Asuncion",
              dateOfLastEmail: "05/15/2023",
              dateCreated: "05/6/2023"
            }
          ]
    },
    {
      name: 'Darwin Maglaqui',
      incoming: 14,
      actionInProgress: 8,
      pendingClientFeedback: 20,
      completed: 12,
      onHold: 6,
      averageResolutionTime: 3.6,
      tickets: [
          {
            name: "American Textile | Meeting Topics",
            stage: "Action in Progress",
            daysInStage: 3,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/26/2023",
            dateCreated: "05/12/2023"
          },
          {
            name: "Zuma | April Agent Incentives",
            stage: "Pending Client Feedback",
            daysInStage: 1,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/15/2023",
            dateCreated: "05/6/2023"
          }
        ]
    },
    {
      name: 'Mark Kevin Cacho',
      incoming: 14,
      actionInProgress: 21,
      pendingClientFeedback: 7,
      completed: 28,
      onHold: 7,
      averageResolutionTime: 0.8,
      tickets: [
          {
            name: "Geiger | Meeting Topics",
            stage: "Action in Progress",
            daysInStage: 3,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/26/2023",
            dateCreated: "05/12/2023"
          },
          {
            name: "TSP Wealth LLP | Client Visit",
            stage: "Pending Client Feedback",
            daysInStage: 1,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/15/2023",
            dateCreated: "05/6/2023"
          }
        ]
    },
    {
      name: 'Christian Evans',
      incoming: 7,
      actionInProgress: 12,
      pendingClientFeedback: 19,
      completed: 26,
      onHold: 9,
      averageResolutionTime: 1.1,
      tickets: [
          {
            name: "Geiger | Meeting Topics",
            stage: "Action in Progress",
            daysInStage: 3,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/26/2023",
            dateCreated: "05/12/2023"
          },
          {
            name: "TSP Wealth LLP | Client Visit",
            stage: "Pending Client Feedback",
            daysInStage: 1,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/15/2023",
            dateCreated: "05/6/2023"
          }
        ]
    },
    {
      name: 'Kyle Ryan Austria',
      incoming: 2,
      actionInProgress: 16,
      pendingClientFeedback: 17,
      completed: 22,
      onHold: 32,
      averageResolutionTime: 1.5,
      tickets: [
          {
            name: "Geiger | Meeting Topics",
            stage: "Action in Progress",
            daysInStage: 3,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/26/2023",
            dateCreated: "05/12/2023"
          },
          {
            name: "TSP Wealth LLP | Client Visit",
            stage: "Pending Client Feedback",
            daysInStage: 1,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/15/2023",
            dateCreated: "05/6/2023"
          }
        ]
    },
    {
      name: 'Rowen Pangilinan',
      incoming: 8,
      actionInProgress: 18,
      pendingClientFeedback: 4,
      completed: 13,
      onHold: 7,
      averageResolutionTime: 2.4,
      tickets: [
          {
            name: "Geiger | Meeting Topics",
            stage: "Action in Progress",
            daysInStage: 3,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/26/2023",
            dateCreated: "05/12/2023"
          },
          {
            name: "TSP Wealth LLP | Client Visit",
            stage: "Pending Client Feedback",
            daysInStage: 1,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/15/2023",
            dateCreated: "05/6/2023"
          }
        ]
    },
    {
      name: 'John Anthony Almario',
      incoming: 17,
      actionInProgress: 15,
      pendingClientFeedback: 2,
      completed: 38,
      onHold: 6,
      averageResolutionTime: 3.1,
      tickets: [
          {
            name: "Geiger | Meeting Topics",
            stage: "Action in Progress",
            daysInStage: 3,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/26/2023",
            dateCreated: "05/12/2023"
          },
          {
            name: "TSP Wealth LLP | Client Visit",
            stage: "Pending Client Feedback",
            daysInStage: 1,
            createdBy: "Randolph Asuncion",
            dateOfLastEmail: "05/15/2023",
            dateCreated: "05/6/2023"
          }
        ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDetail(index: number): void {
    this.showDetailIndex = this.showDetailIndex === index ? null : index;
  }
}
