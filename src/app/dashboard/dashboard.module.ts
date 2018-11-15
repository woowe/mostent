import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddSpaceDialogComponent } from './components/add-space-dialog/add-space-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MdcButtonModule } from '@angular-mdc/web';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MdcButtonModule
    ],
    declarations: [DashboardComponent, AddSpaceDialogComponent],
    entryComponents: [AddSpaceDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
