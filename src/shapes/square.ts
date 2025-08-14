import type { PoolItem } from 'pixi.js';
import { Shape, type ShapeKind, type ShapeOptions } from './shape';

export class Square extends Shape implements PoolItem {
    width!: number;
    type: ShapeKind = 'square';

    init(options: ShapeOptions) {
        super.init(options);
        this.width = this.sprite.width;
    }

    containsPoint(x: number, y: number): boolean {
        return this.sprite.getBounds().containsPoint(x, y);
    }

    area(): number {
        return this.width * this.width;
    }

    isOutOfBounds(maxY: number): boolean {
        return this.sprite.position.y > maxY;
    }

    remove() {
        // this.sprite.parent?.removeChild(this.sprite);
        // this.sprite.destroy();
    }
}