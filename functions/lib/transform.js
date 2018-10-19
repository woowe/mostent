"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
class Transform {
    constructor(s) {
        this.transform_opts = ['w', 'h', 'fit', 'position'];
        this.sharp = s;
    }
    transform(query) {
        const { w, h, fit, position } = query;
        return sharp.resize({
            width: w,
            height: h,
            fit,
            position
        });
    }
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map