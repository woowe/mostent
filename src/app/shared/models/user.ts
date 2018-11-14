import { DocumentReference } from '@angular/fire/firestore';

// Model representing the User in the database

export interface User {
    first_name: string;
    last_name: string;
    uid: string;
    email: string;
    spaces?: DocumentReference[];
}
