import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Space } from 'src/app/shared/models/space';

@Component({
    selector: 'app-space',
    templateUrl: './space.component.html',
    styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit, OnDestroy {
    sub: Subscription;

    space$: Observable<Space>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // this.route.params.pipe(
        //     map(params => params['id']),
        // )
    }
}
