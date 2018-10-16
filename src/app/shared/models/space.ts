import { DocumentReference } from '@angular/fire/firestore';

export interface Space {
    uid: string;
    name: string;
    users: DocumentReference[];
    assets: DocumentReference[];
}
