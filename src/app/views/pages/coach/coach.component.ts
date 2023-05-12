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
        averageResolutionTime: 2.5
    },
    {
        name: 'Robin Berido Jr.',
        incoming: 21,
        actionInProgress: 15,
        pendingClientFeedback: 9,
        completed: 18,
        onHold: 6,
        averageResolutionTime: 1.8
    },
    {
      name: 'Darwin Maglaqui',
      incoming: 14,
      actionInProgress: 8,
      pendingClientFeedback: 20,
      completed: 12,
      onHold: 6,
      averageResolutionTime: 3.6
    },
    {
      name: 'Mark Kevin Cacho',
      incoming: 14,
      actionInProgress: 21,
      pendingClientFeedback: 7,
      completed: 28,
      onHold: 7,
      averageResolutionTime: 0.8
    },
    {
      name: 'Christian Evans',
      incoming: 7,
      actionInProgress: 12,
      pendingClientFeedback: 19,
      completed: 26,
      onHold: 9,
      averageResolutionTime: 1.1
    },
    {
      name: 'Kyle Ryan Austria',
      incoming: 2,
      actionInProgress: 16,
      pendingClientFeedback: 17,
      completed: 22,
      onHold: 32,
      averageResolutionTime: 1.5
    },
    {
      name: 'Rowen Pangilinan',
      incoming: 8,
      actionInProgress: 18,
      pendingClientFeedback: 4,
      completed: 13,
      onHold: 7,
      averageResolutionTime: 2.4
    },
    {
      name: 'John Anthony Almario',
      incoming: 17,
      actionInProgress: 15,
      pendingClientFeedback: 2,
      completed: 38,
      onHold: 6,
      averageResolutionTime: 3.1
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDetail(index: number): void {
    this.showDetailIndex = this.showDetailIndex === index ? null : index;
  }
}
