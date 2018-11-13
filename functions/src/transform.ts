import * as sharp from 'sharp';

export class Transform {
    private transform_opts = ['w', 'h', 'fit', 'position'];

    private sharp: sharp.Sharp;

    constructor(s: sharp.Sharp) {
        this.sharp = s;
    }

    transform(query: any): sharp.Sharp {
        const { w, h, fit, position } = query;

        return sharp.resize({
            width: w,
            height: h,
            fit,
            position
        });
    }
}
