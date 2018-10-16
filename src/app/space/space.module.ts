import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SpaceComponent } from './container/space/space.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import { FileDropModule } from 'ngx-file-drop';

@NgModule({
    imports: [
        CommonModule,
        SpaceRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        FileDropModule
    ],
    declarations: [SpaceComponent]
})
export class SpaceModule {}
