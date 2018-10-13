import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    Validators,
    FormControl,
    EmailValidator
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    success;

    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    ngOnInit() {
        this.form = this.createForm();
    }

    createForm() {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    login() {
        from(
            this.afAuth.auth.signInWithEmailAndPassword(
                this.form.get('email').value,
                this.form.get('password').value
            )
        ).subscribe(
            user => {
                if (!user.user.emailVerified) {
                    this.success = false;

                    console.warn("User doesn't have a verified email", user);
                } else {
                    this.success = true;

                    timer(200).subscribe(() => {
                        this.router.navigate(['/dashboard']);
                    });
                }
            },
            err => {
                this.success = false;

                console.log(err);
            }
        );
    }
}
