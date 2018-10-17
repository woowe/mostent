import { State, StateContext, Action } from '@ngxs/store';
import { Asset } from 'src/app/shared/models/asset';
import { AddAsset, AddAssetToSpace, RemoveAsset } from '../actions/asset';
import { AssetsService } from '../services/assets/assets.service';
import { from } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export interface AssetStateModel {
    all: Asset[];
}

@State<AssetStateModel>({
    name: 'assets',
    defaults: {
        all: null
    }
})
export class AssetState {
    constructor(
        private assetService: AssetsService,
        private afs: AngularFirestore
    ) {}

    @Action(AddAsset)
    addAsset(
        { getState, patchState }: StateContext<AssetStateModel>,
        { path, space }: AddAsset
    ) {
        const id = this.afs.createId();

        const asset = {
            uid: id,
            path
        };

        return this.assetService.addImage(asset).pipe(
            tap(() => {
                const { all } = getState();

                patchState({
                    all: [...(all || []), asset]
                });
            }),
            switchMap(() => {
                return this.assetService.addImageToSpace(space, asset);
            })
        );
    }

    @Action(RemoveAsset)
    removeAsset(
        { getState, patchState }: StateContext<AssetStateModel>,
        { asset, space }: RemoveAsset
    ) {
        const { path, uid } = asset;
        return this.assetService.removeImageFromSpace(uid, space).pipe(
            switchMap(() => this.assetService.removeImageDBEntry(uid)),
            switchMap(() => this.assetService.removeImageFromStorage(path)),
            tap(() => {
                const { all } = getState();

                const idx = all.findIndex(v => v.uid === asset.uid);

                if (idx > -1) {
                    patchState({
                        all: [
                            ...all.slice(0, idx),
                            ...all.slice(idx + 1, all.length)
                        ]
                    });
                }
            })
        );
    }
}
