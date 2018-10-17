import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SpaceState } from './state/space';
import { AuthState } from './state/auth';
import { AssetState } from './state/asset';

@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forFeature([SpaceState, AuthState, AssetState])
    ],
    declarations: []
})
export class CoreModule {}
