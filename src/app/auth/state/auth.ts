import { State, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from '../actions/auth';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';

export interface AuthStateModel {
    userCred: firebase.auth.UserCredential;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        userCred: null
    }
})
export class AuthState {
    constructor(private afs: AngularFirestore, private auth: AuthService) {}

    @Action(Login)
    login(
        { patchState }: StateContext<AuthStateModel>,
        { email, password }: Login
    ) {
        return from(this.auth.emailPasswordLogin(email, password)).pipe(
            map(userCred => {
                if (!userCred.user.emailVerified) {
                    throw new Error("User doesn't have a verified email!");
                }

                patchState({
                    userCred
                });

                return userCred;
            })
        );
    }
}
