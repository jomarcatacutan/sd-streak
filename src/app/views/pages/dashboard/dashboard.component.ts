import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})

export class DashboardComponent implements OnInit {
  /** NgbDatepicker */
  currentDate: NgbDateStruct;

  /** Ticket Table */
  clearInterval: any;
  lastUpdate: Date;
  currentIntervalLabel: string = '5 minutes';
  rows: any[] = [];
  temp: any[] = [...this.rows];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  headers = [
    {"id": "name", "label": "Ticket Name"},
    {"id": "stage", "label": "Stage"},
    {"id": "assignees", "label": "Assigned"},
    {"id": "daysInStage", "label": "Days in Stage"},
    {"id": "creationDate", "label": "Date Created"},
  ];
  detailHeaders = [
    {"id": "firstEmailReceivedTimestamp", "label": "Date of First Received"},
    {"id": "lastEmailReceivedTimestamp", "label": "Date of Last Email"},
    {"id": "lastUpdatedTimestamp", "label": "Date Last Updated"},
    {"id": "freshness", "label": "Freshness"},
    {"id": "lastEmailFrom", "label": "Last Email From"},
    {"id": "totalNumberOfEmails", "label": "Total Email Message"}
  ];

  /** Search Functionality */
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
  
    // If the search box is empty, reset rows to original data
    if (!val) {
      this.rows = [...this.temp];
      this.table.offset = 0;
      return;
    }
  
    // filter our data
    const temp = this.temp.filter((row: any) => {
      return Object.keys(row).some((key: any) => {
        let cellValue = row[key];
        if (cellValue === null || cellValue === undefined) {
          return false;
        }
        if (typeof cellValue === 'object' && cellValue !== null) {
          // Handle date values separately
          if (cellValue instanceof Date) {
            const dateString = cellValue.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).toLowerCase();
            return dateString.includes(val);
          }
          return false;
        }
        let cellValueString = String(cellValue).toLowerCase();
  
        // Split search query into terms and check if each term is contained within the cell value
        const searchTerms = val.split(' ');
        return searchTerms.every((term: string) => cellValueString.includes(term));
      });
    });
  
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }    

  /** Ticket Count */
  current_ticket_count: any;
  weekly_ticket_count: any;
  monthly_ticket_count: any;

  /** All Ticket List */
  all_tickets: any;

  /** Row detail is closed when another row is expanded */
  expandedRow: any = null;

  toggleExpandRow(row: any) {
    if (this.expandedRow && this.expandedRow !== row) {
      this.table.rowDetail.toggleExpandRow(this.expandedRow);
      this.expandedRow = null;
    }
  
    this.table.rowDetail.toggleExpandRow(row);

    if (this.expandedRow === row) {
      this.expandedRow = null;
    } else {
      this.expandedRow = row;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (this.expandedRow && !(event.target as HTMLElement).closest('.datatable-row-wrapper')) {
      this.toggleExpandRow(this.expandedRow);  // Close the currently expanded row
    }
  }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private calendar: NgbCalendar,
    private http: HttpClient
    ) {
       this.fetch((data: any) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
    }

  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://sd-api-isd.clarkoutsourcing.com/gettickets`);
    req.onload = () => {
      let data = JSON.parse(req.response);
      data = data.map((item: any) => {
        const creationDate = new Date(item.creationDate);
        const formattedCreationDate = creationDate.toLocaleString('en-US', {
          year: 'numeric', 
          month: 'short', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: true 
        });
        return {
          ...item,
          creationDate,
          formattedCreationDate
        }
      });
      cb(data);
      // Set temp data here after data fetch
      this.temp = [...data];
      // Record the last update time
      this.lastUpdate = new Date();
  
      // Fetch counts
      this.fetchTicketCount('getrealtimecount', 'current_ticket_count');
      this.fetchTicketCount('getweekcount', 'weekly_ticket_count');
      this.fetchTicketCount('getmonthcount', 'monthly_ticket_count');
    };
      
    req.send();
  }
  
  fetchTicketCount(endpoint: string, property: 'current_ticket_count' | 'weekly_ticket_count' | 'monthly_ticket_count') {
    const req = new XMLHttpRequest();
    req.open('GET', `https://sd-api-isd.clarkoutsourcing.com/${endpoint}`);
    req.onload = () => {
      this[property] = JSON.parse(req.response);
    };
    req.send();
  }  

  ngOnInit(): void {
    this.currentDate = this.calendar.getToday();
  }

  ngAfterViewInit() {
    this.setInterval(300000);  // 300,000 milliseconds = 5 minutes
  }
  
  ngOnDestroy() {
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
    }
  }  
    
  /** Set Interval for Refresh */
  setInterval(interval: number) {
    // Clear existing interval
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
    }
  
    // Set new interval
    this.clearInterval = setInterval(() => {
      this.fetch((data: any) => {
        this.rows = data;
        setTimeout(() => {
          this.loadingIndicator = false;
        }, 1500);
      });
    }, interval);
  
    // Update the interval label
    switch (interval) {
      case 60000:
        this.currentIntervalLabel = '1 minute';
        break;
      case 300000:
        this.currentIntervalLabel = '5 minutes';
        break;
      case 600000:
        this.currentIntervalLabel = '10 minutes';
        break;
      case 900000:
        this.currentIntervalLabel = '15 minutes';
        break;
      case 1800000:
        this.currentIntervalLabel = '30 minutes';
        break;
      case 3600000:
        this.currentIntervalLabel = '1 hour';
        break;
      default:
        this.currentIntervalLabel = '5 minutes';
    }
  }  

  /** Hide */
  isNotVisible: boolean = false; 

  /** Show Other Ticket Details */
  showDetailIndex: number | null = null;

  toggleDetail(index: number): void {
    this.showDetailIndex = this.showDetailIndex === index ? null : index;
  }

}