import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormGroup,
    Validators,
    FormControl,
    EmailValidator
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, timer } from 'rxjs';
import { Router } from '@angular/router';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/core/actions/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    public success;

    userCollection: AngularFirestoreCollection<User>;

    infoMessage;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private afs: AngularFirestore,
        private store: Store
    ) {}

    ngOnInit() {
        this.form = this.createForm();

        this.form.valueChanges.subscribe(() => {
            this.success = null;
        });

        this.userCollection = this.afs.collection<User>('Users');
    }

    createForm() {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    login() {
        this.store
            .dispatch(
                new Login(
                    this.form.get('email').value,
                    this.form.get('password').value
                )
            )
            .subscribe(
                userCred => {
                    console.log('Success', userCred);

                    this.success = true;

                    this.router.navigate(['/']);
                },
                err => {
                    console.log('Something went wrong!', err);

                    this.success = false;

                    if (err.name === 'EmailVerifiedError') {
                        this.infoMessage = 'Please verify your login';
                    } else {
                        this.infoMessage = 'Email or password is wrong';
                    }
                }
            );
    }
}
