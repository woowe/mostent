import { Component, OnInit } from '@angular/core';
import { Store, Selector, Select } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { AddSpaceDialogComponent } from '../../components/add-space-dialog/add-space-dialog.component';
import { switchMap, take, map, filter } from 'rxjs/operators';
import { CreateSpace, FetchSpaces } from 'src/app/core/actions/space';
import { AuthState } from 'src/app/core/state/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { SpaceState } from 'src/app/core/state/space';
import { Space } from 'src/app/shared/models/space';
import { AngularFirestore } from '@angular/fire/firestore';
import { SpaceService } from 'src/app/core/services/space/space.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @Select(AuthState.user)
    user$: Observable<User>;

    @Select(SpaceState.spaces)
    _spaces$: Observable<Space[]>;
    spaces$: Observable<any[]>;

    constructor(
        private store: Store,
        public dialog: MatDialog,
        private spaceService: SpaceService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore
    ) {}

    ngOnInit() {
        this.user$
            .pipe(
                take(1),
                switchMap(user => this.store.dispatch(new FetchSpaces(user)))
            )
            .subscribe(spaces => {});

        this.spaces$ = this._spaces$.pipe(
            filter(spaces => spaces !== null && spaces !== undefined),
            switchMap(async spaces => {
                for (const space of spaces) {
                    const _assets = [];
                    const lng = space.assets.length;
                    for (let i = 0; i < space.assets.length; ++i) {
                        if (i >= 4) {
                            break;
                        }
                        _assets.push(space.assets[i]);
                    }
                    space.assets = _assets;
                    (space as any).more = Math.max(0, lng - 4);
                    console.log(space);

                    const assets = await this.spaceService
                        .joinAssets(space)
                        .toPromise();
                    space.assets = assets;

                    for (const asset of assets) {
                        const fileRef = this.storage.ref(asset.path);
                        asset.url = await fileRef.getDownloadURL().toPromise();
                        asset.basename = this.basename(asset.path);
                    }
                }

                return spaces;
            })
        );
    }

    private basename(path) {
        return path.split('/').reverse()[0];
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
