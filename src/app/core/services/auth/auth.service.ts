import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs
                        .doc<User>(`Users/${user.uid}`)
                        .valueChanges();
                }

                return of(null);
            })
        );
    }

    emailPasswordLogin(email: string, password: string) {
        return from(
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
        );
    }

    createUser(email: string, password: string) {
        return from(
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        ).pipe(
            tap(userCred => {
                userCred.user.sendEmailVerification();
                this.updateUserData(userCred.user);
            })
        );
    }

    updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `Users/${user.uid}`
        );

        const data: User = {
            uid: user.uid,
            email: user.email
        };

        return userRef.set(data, { merge: true });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/auth/login']);
        });
    }
}
