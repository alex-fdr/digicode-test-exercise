import { Shape, type ShapeKind, type ShapeOptions } from './shape';

export class Square extends Shape {
    // width!: number;
    type: ShapeKind = 'square';

    init(options: ShapeOptions) {
        super.init(options);
        // this.width = this.sprite.width;
    }

    isPointInside(x: number, y: number): boolean {
        // return this.sprite.getBounds().containsPoint(x, y);
        if (x < this.x) return false;
        if (x > this.x + this.width) return false;
        if (y < this.y) return false;
        if (y > this.y + this.height) return false;
        return true;
    }

    area(): number {
        return this.width * this.width;
    }
}