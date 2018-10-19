import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as os from 'os';
import * as path from 'path';

import * as mime from 'mime-types';
import { urlencoded } from 'body-parser';

admin.initializeApp();

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const getImage = functions.https.onRequest((request, response) => {
    const { uid, file, w, h, format, size } = request.query;

    const bucketName = admin.storage().bucket().name;

    response.send({
        bucketName: admin.storage().bucket().name
    });

    // const gcpFile = await admin
    //     .storage()
    //     .bucket()
    //     .file(`/space/${uid}/${file}`)
    //     .get();

    const bucketPath = `space/${uid}/${file}`;

    response.redirect(
        `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
            bucketPath
        )}?alt=media`
    );

    // response.send(gcpFile[1]);

    // response.send({
    //     space,
    //     fileName,
    //     w,
    //     h,
    //     format,
    //     size
    // });
});
