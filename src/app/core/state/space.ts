import { State, StateContext, Action, Select, Selector } from '@ngxs/store';
import { Space } from 'src/app/shared/models/space';
import { CreateSpace, FetchSpaces } from '../actions/space';
import { SpaceService } from '../services/space/space.service';
import { tap, switchMap, map, take } from 'rxjs/operators';
import { forkJoin, zip, combineLatest } from 'rxjs';

export interface SpaceStateModel {
    all: Space[];
    current: Space;
}

@State<SpaceStateModel>({
    name: 'spaces',
    defaults: {
        all: null,
        current: null
    }
})
export class SpaceState {
    @Selector()
    static spaces(state: SpaceStateModel) {
        return state.all;
    }

    constructor(private spaceService: SpaceService) {}

    @Action(FetchSpaces)
    fetchSpaces(
        { patchState }: StateContext<SpaceStateModel>,
        { user }: FetchSpaces
    ) {
        return this.spaceService.fetchSpacesForUser(user).pipe(
            switchMap(spaceDocRefs =>
                combineLatest(spaceDocRefs.map(ref => ref.valueChanges()))
            ),
            tap(spaces => {
                patchState({
                    all: spaces
                });
            }),
            take(1)
        );
    }

    @Action(CreateSpace)
    createSpace(
        ctx: StateContext<SpaceStateModel>,
        { name, user }: CreateSpace
    ) {
        return this.spaceService.createSpace(name, user);
    }
}
