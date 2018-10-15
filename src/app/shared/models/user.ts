import { DocumentReference } from '@angular/fire/firestore';

// Model representing the User in the database

export interface User {
    uid: string;
    email: string;
    spaces?: DocumentReference[];
}
