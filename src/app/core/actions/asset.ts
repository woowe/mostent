import { Space } from 'src/app/shared/models/space';
import { Asset } from 'src/app/shared/models/asset';

export class AddAsset {
    static readonly type = '[Asset] Add Asset';
    constructor(public path: string, public space: Space) {}
}

export class AddAssetToSpace {
    static readonly type = '[Asset] Add Asset To Space';
    constructor(public uid: string, public space: Space) {}
}

export class RemoveAsset {
    static readonly type = '[Asset] Remove Asset';
    constructor(public asset: Asset, public space: Space) {}
}
