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

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './container/login/login.component';
import { SignupComponent } from './container/signup/signup.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './state/auth';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        NgxsModule.forFeature([AuthState])
    ],
    declarations: [LoginComponent, SignupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
