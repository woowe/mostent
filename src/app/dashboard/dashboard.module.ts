import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FlexLayoutModule,
        MatButtonModule
    ],
    declarations: [DashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
