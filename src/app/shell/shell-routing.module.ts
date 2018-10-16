import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './container/shell/shell.component';

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'space/:id',
                loadChildren: '../space/space.module#SpaceModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellRoutingModule {}
