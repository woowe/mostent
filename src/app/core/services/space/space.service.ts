import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../auth/auth.service';
import { Space } from 'src/app/shared/models/space';

@Injectable({
    providedIn: 'root'
})
export class SpaceService {
    accessible: Space[];
    constructor(private afs: AngularFirestore, private auth: AuthService) {
        //   this.accessible = this.auth.user.pipe(
        //       switchMap(user => {
        //           //
        //       })
        //   )
    }

    createSpace(name: string, user: User) {
        const userRef = this.afs.doc<User>(`Users/${user.uid}`);

        const id = this.afs.createId();
        const a = this.afs.doc(`space_map/${user.uid}/${id}`).set(1);
        const b = this.afs.doc<Space>(`Spaces/${id}`).set({
            name,
            users: [userRef.ref],
            assets: null
        });

        return Promise.all([a, b]);
    }

    updateSpace() {}

    deleteSpace() {}
}
