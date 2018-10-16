import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-space-dialog',
    templateUrl: './add-space-dialog.component.html',
    styleUrls: ['./add-space-dialog.component.scss']
})
export class AddSpaceDialogComponent implements OnInit {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddSpaceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.form = this.createForm();
    }

    createForm() {
        return new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    createSpace() {
        this.dialogRef.close({
            name: this.form.get('name').value
        });
    }

    close() {
        this.dialogRef.close();
    }
}
