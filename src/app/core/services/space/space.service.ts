import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../auth/auth.service';
import { Space } from 'src/app/shared/models/space';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpaceService {
    constructor(private afs: AngularFirestore, private auth: AuthService) {}

    fetchSpacesForUser(user: User) {
        const spaceCol = this.afs.collection(`space_map/${user.uid}/spaces`);

        return spaceCol.valueChanges().pipe(
            map(spaces => {
                const keys = Object.keys(spaces);

                let refs = [];

                for (const space of spaces) {
                    const key = Object.keys(space)[0];

                    if (space[key] === true) {
                        refs.push(this.afs.doc<Space>(`Spaces/${key}`));
                    }
                }

                return refs;
            })
        );
    }

    createSpace(name: string, user: User) {
        const userRef = this.afs.doc<User>(`Users/${user.uid}`);

        const id = this.afs.createId();
        const a = this.afs
            .doc(`space_map/${user.uid}/spaces/${id}`)
            .set({ [id]: true });
        const b = this.afs.doc<Space>(`Spaces/${id}`).set({
            uid: id,
            name,
            users: [userRef.ref],
            assets: null
        });

        return Promise.all([a, b]);
    }

    updateSpace() {}

    deleteSpace() {}
}
