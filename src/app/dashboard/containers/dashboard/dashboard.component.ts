import { Component, OnInit } from '@angular/core';
import { Store, Selector, Select } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { AddSpaceDialogComponent } from '../../components/add-space-dialog/add-space-dialog.component';
import { switchMap, take } from 'rxjs/operators';
import { CreateSpace, FetchSpaces } from 'src/app/core/actions/space';
import { AuthState } from 'src/app/core/state/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { SpaceState } from 'src/app/core/state/space';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @Select(AuthState.user)
    user$: Observable<User>;

    @Select(SpaceState.spaces)
    spaces$: Observable<User>;

    constructor(private store: Store, public dialog: MatDialog) {}

    ngOnInit() {
        this.user$
            .pipe(
                take(1),
                switchMap(user => this.store.dispatch(new FetchSpaces(user)))
            )
            .subscribe(spaces => {});
    }

    openSpaceDialog() {
        const dialogRef = this.dialog.open(AddSpaceDialogComponent, {
            width: '250px'
        });

        dialogRef
            .afterClosed()
            .pipe(
                switchMap(
                    ({ name }) => this.user$,
                    ({ name }, user) => ({ name, user })
                ),
                switchMap(({ name, user }) =>
                    this.store.dispatch(new CreateSpace(name, user))
                )
            )
            .subscribe(
                res => {
                    console.log('Space created ', res);
                },
                err => {
                    console.warn('An error occured!', err);
                }
            );
    }
}
