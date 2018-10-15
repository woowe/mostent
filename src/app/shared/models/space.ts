import { DocumentReference } from '@angular/fire/firestore';

export interface Space {
    name: string;
    users: DocumentReference[];
    assets: DocumentReference[];
}
