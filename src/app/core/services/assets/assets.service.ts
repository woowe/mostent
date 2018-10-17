import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Asset } from 'src/app/shared/models/asset';
import { Space } from 'src/app/shared/models/space';
import { Image } from 'src/app/shared/models/image';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {
    constructor(
        private afs: AngularFirestore,
        private storage: AngularFireStorage
    ) {}

    addImage(asset: Asset) {
        return from(this.afs.doc(`Assets/${asset.uid}`).set(asset));
    }

    removeImageDBEntry(uid: string) {
        console.log('[AssetService/removeImageDBEntry] called');
        return from(this.afs.doc(`Assets/${uid}`).delete());
    }

    removeImageFromStorage(path: string) {
        console.log('[AssetService/removeImageFromStorage] called');
        const ref = this.storage.ref(path);

        return ref.delete();
    }

    addImageToSpace(space: Space, asset: Asset) {
        const assetRef = this.afs.doc(`Assets/${asset.uid}`);

        return from(
            this.afs.doc(`Spaces/${space.uid}`).update({
                assets: firebase.firestore.FieldValue.arrayUnion(assetRef.ref)
            })
        );
    }

    removeImageFromSpace(uid: string, space: Space) {
        console.log('[AssetService/removeImageFromSpace] called');

        const assetRef = this.afs.doc(`Assets/${uid}`);

        return from(
            this.afs.doc(`Spaces/${space.uid}`).update({
                assets: firebase.firestore.FieldValue.arrayRemove(assetRef.ref)
            })
        );
    }
}
