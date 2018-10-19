"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.getImage = functions.https.onRequest((request, response) => {
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
    response.redirect(`https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(bucketPath)}?alt=media`);
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
//# sourceMappingURL=index.js.map