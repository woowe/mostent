import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import { matchPassword } from '../../../shared/validators';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    success;

    userCollection: AngularFirestoreCollection<User>;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private afs: AngularFirestore
    ) {}

    ngOnInit() {
        this.form = this.createForm();

        this.form.valueChanges.subscribe(() => {
            this.success = null;
        });

        this.userCollection = this.afs.collection('Users');
    }

    createForm() {
        return new FormGroup(
            {
                first_name: new FormControl('', Validators.required),
                last_name: new FormControl('', Validators.required),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email
                ]),
                password: new FormControl('', Validators.required),
                confirm_password: new FormControl('', [Validators.required])
            },
            { validators: matchPassword }
        );
    }

    createUser() {
        this.success = null;

        this.auth
            .createUser(
                this.form.get('first_name').value,
                this.form.get('last_name').value,
                this.form.get('email').value,
                this.form.get('password').value
            )
            .subscribe(
                data => {
                    this.success = true;
                },
                err => {
                    this.success = false;
                }
            );
    }
}
