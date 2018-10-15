import { User } from 'src/app/shared/models/user';
import { Space } from 'src/app/shared/models/space';

export class CreateSpace {
    static readonly type = '[Space] Create Space';
    constructor(public name: string, public user: User) {}
}

export class UpdateSpace {
    static readonly type = '[Space] Update Space';
    constructor(public readonly space: Partial<Space>) {}
}

export class DeleteSpace {
    static readonly type = '[Space] Delete Space';
    constructor(public readonly uid: string) {}
}
