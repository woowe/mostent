import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { matchPassword } from '../../../shared/validators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    success;

    constructor(private fb: FormBuilder, private auth: AngularFireAuth) {}

    ngOnInit() {
        this.form = this.createForm();
    }

    createForm() {
        return new FormGroup(
            {
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

        from(
            this.auth.auth.createUserWithEmailAndPassword(
                this.form.get('email').value,
                this.form.get('password').value
            )
        )
            .pipe(
                switchMap(data => this.auth.authState),
                tap(state => state.sendEmailVerification())
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
