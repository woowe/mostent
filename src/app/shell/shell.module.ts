import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './container/shell/shell.component';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        ShellRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        FlexLayoutModule
    ],
    declarations: [ShellComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShellModule {}
