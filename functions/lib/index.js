<<<<<<< HEAD
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
=======
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const os_1 = require("os");
const path_1 = require("path");
const fs = require("fs-extra");
const sharp = require("sharp");
admin.initializeApp();
function resize(path, format, width, height, fit, position) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();
    if (format) {
        transform = transform.toFormat(format, { progressive: true });
    }
    if (width || height || fit || position) {
        transform = transform.resize({ width, height, fit, position });
    }
    return readStream.pipe(transform);
}
const app2 = express();
app2.get('/space/:spaceUid/:file', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { spaceUid, file } = req.params;
    // path setup
    const workdir = path_1.join(os_1.tmpdir(), `space/${spaceUid}`);
    const filePath = path_1.join(workdir, file);
    fs.ensureDir(workdir);
    // variables used in the try/catch blocks
    let gcpFile, exists, buff;
    try {
        gcpFile = yield admin
            .storage()
            .bucket()
            .file(`space/${spaceUid}/${file}`)
            .get();
    }
    catch (e) {
        console.error(`Unable to get 'space/${spaceUid}/${file}'`, e);
        return;
    }
    // download the file from firebase storage if the file doesn't already exsit
    try {
        exists = yield fs.pathExists(filePath);
        if (!exists) {
            buff = yield gcpFile[0].download({ destination: filePath });
        }
    }
    catch (e) {
        console.error(`Unable to download file to destination: ${filePath}`, e);
        return;
    }
    let { width, height, fit, position, format } = req.query;
    if (width) {
        width = parseInt(width);
    }
    if (height) {
        height = parseInt(height);
    }
    let contentType = gcpFile[1].contentType;
    if (format) {
        contentType = `image/${format}`;
    }
    res.type(contentType);
    resize(filePath, format, width, height, fit, position).pipe(res);
}));
exports.getImage = functions.https.onRequest(app2);
>>>>>>> 922180f7e5b864a4f4cedde78626492d6c02a967
//# sourceMappingURL=index.js.map