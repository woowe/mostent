import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SpaceState } from './state/space';
import { AuthState } from './state/auth';

@NgModule({
    imports: [CommonModule, NgxsModule.forFeature([SpaceState, AuthState])],
    declarations: []
})
export class CoreModule {}
