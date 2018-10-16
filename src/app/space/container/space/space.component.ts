import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, never } from 'rxjs';
import { Space } from 'src/app/shared/models/space';
import { map, switchMap, tap, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateSpace } from 'src/app/core/actions/space';
import { SpaceService } from 'src/app/core/services/space/space.service';

import {
    UploadEvent,
    UploadFile,
    FileSystemFileEntry,
    FileSystemDirectoryEntry
} from 'ngx-file-drop';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-space',
    templateUrl: './space.component.html',
    styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
    form: FormGroup;
    space$: Observable<Space>;
    images$: Observable<any>;

    files: UploadFile[] = [];
    uploadTasks: { name: string; percentChanges: Observable<number> }[] = [];

    constructor(
        private afs: AngularFirestore,
        private route: ActivatedRoute,
        private store: Store,
        private storage: AngularFireStorage
    ) {}

    ngOnInit() {
        this.space$ = this.route.params.pipe(
            map(params => params['id']),
            switchMap(id => this.afs.doc<Space>(`Spaces/${id}`).valueChanges())
        );

        this.form = this.createForm();
    }

    createForm() {
        return new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    updateSpaceInfo(uid: string) {
        if (this.form.valid) {
            const space: Partial<Space> = {
                uid,
                name: this.form.get('name').value
            };

            this.store.dispatch(new UpdateSpace(space));
        }
    }

    public dropped(event: UploadEvent, uid: string) {
        this.files = event.files;
        for (const droppedFile of event.files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    const filePath = `space/${uid}/${droppedFile.relativePath}`;
                    const task = this.storage.upload(filePath, file);

                    this.uploadTasks.push({
                        name: droppedFile.relativePath,
                        percentChanges: task.percentageChanges()
                    });

                    task.snapshotChanges()
                        .pipe(
                            finalize(() => {
                                console.log('file upload complete');

                                // let idx = this.uploadTasks.findIndex(v => v.name === droppedFile.relativePath);
                                // this.uploadTasks
                            })
                        )
                        .subscribe();
                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }
}
