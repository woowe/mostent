import { State, StateContext, Action, Select, Selector } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Login, UpdateUser } from '../actions/auth';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user';

export interface AuthStateModel {
    userCred: firebase.auth.UserCredential;
    user: User;
}

function EmailVerifiedError(message, userCred) {
    this.message = message;
    this.userCred = userCred;
    this.name = 'EmailVerifiedError';
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        userCred: null,
        user: null
    }
})
export class AuthState {
    @Selector()
    static user(state: AuthStateModel) {
        return state.user;
    }

    constructor(private afs: AngularFirestore, private auth: AuthService) {}

    @Action(Login)
    login(
        { patchState }: StateContext<AuthStateModel>,
        { email, password }: Login
    ) {
        return from(this.auth.emailPasswordLogin(email, password)).pipe(
            map(userCred => {
                if (!userCred.user.emailVerified) {
                    throw new EmailVerifiedError(
                        "User doesn't have a verified email!",
                        userCred
                    );
                }

                patchState({
                    userCred
                });

                return userCred;
            })
        );
    }

    @Action(UpdateUser)
    updateUser(
        { patchState }: StateContext<AuthStateModel>,
        { user }: UpdateUser
    ) {
        patchState({
            user
        });
    }
}
