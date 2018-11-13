import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
} from '@angular/material';

import { MdcTextFieldModule, MdcFormFieldModule } from '@angular-mdc/web';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './container/login/login.component';
import { SignupComponent } from './container/signup/signup.component';
import { CoreModule } from '../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MdcFormFieldModule,
        MdcTextFieldModule,
        MatButtonModule
    ],
    declarations: [LoginComponent, SignupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
