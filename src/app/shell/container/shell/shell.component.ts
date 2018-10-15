import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit() {}

    signOut() {
        console.log('signing out...');
        this.auth.signOut();
    }
}
