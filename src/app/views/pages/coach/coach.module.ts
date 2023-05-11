import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng2-charts
import { NgChartsModule } from 'ng2-charts';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { CoachComponent } from './coach.component';


const routes: Routes = [
  {
    path: '',
    component: CoachComponent
  }
]

@NgModule({
  declarations: [CoachComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgChartsModule
  ]
})
export class CoachModule { }
