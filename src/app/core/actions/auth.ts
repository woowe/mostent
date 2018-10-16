import { User } from 'src/app/shared/models/user';

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public email: string, public password: string) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
    constructor(public payload?: any) {}
}

export class UpdateUser {
    static readonly type = '[Auth] Update User';
    constructor(public user: User) {}
}
