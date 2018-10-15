import { State, StateContext, Action } from '@ngxs/store';
import { Space } from 'src/app/shared/models/space';
import { CreateSpace } from '../actions/space';
import { SpaceService } from '../services/space/space.service';

export interface SpaceStateModel {
    accessible: Space[];
    current: Space;
}

@State<SpaceStateModel>({
    name: 'spaces',
    defaults: {
        accessible: null,
        current: null
    }
})
export class SpaceState {
    constructor(private spaceService: SpaceService) {}

    @Action(CreateSpace)
    createSpace(
        ctx: StateContext<SpaceStateModel>,
        { name, user }: CreateSpace
    ) {
        return this.spaceService.createSpace(name, user);
    }
}
