import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SpaceComponent } from './container/space/space.component';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SpaceRoutingModule,
        CoreModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [SpaceComponent]
})
export class SpaceModule {}
