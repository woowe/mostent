import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { tmpdir } from 'os';
import { join } from 'path';
import * as fs from 'fs-extra';
import * as sharp from 'sharp';

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
app2.get('/space/:spaceUid/:file', async (req, res) => {
    const { spaceUid, file } = req.params;

    // path setup
    const workdir = join(tmpdir(), `space/${spaceUid}`);
    const filePath = join(workdir, file);

    fs.ensureDir(workdir);

    // variables used in the try/catch blocks
    let gcpFile, exists, buff;

    try {
        gcpFile = await admin
            .storage()
            .bucket()
            .file(`space/${spaceUid}/${file}`)
            .get();
    } catch (e) {
        console.error(`Unable to get 'space/${spaceUid}/${file}'`, e);
        return;
    }

    // download the file from firebase storage if the file doesn't already exsit
    try {
        exists = await fs.pathExists(filePath);
        if (!exists) {
            buff = await gcpFile[0].download({ destination: filePath });
        }
    } catch (e) {
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
});

export const getImage = functions.https.onRequest(app2);
