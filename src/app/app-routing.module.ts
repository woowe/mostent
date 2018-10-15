import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth';

const routes: Routes = [
    {
        path: '',
        loadChildren: './shell/shell.module#ShellModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
