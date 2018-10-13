import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const matchPassword: ValidatorFn = (
    control: FormGroup
): ValidationErrors | null => {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    return password &&
        confirm_password &&
        password.value === confirm_password.value
        ? null
        : { password_mismatch: true };
};
