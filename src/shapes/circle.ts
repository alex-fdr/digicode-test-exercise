import type { PoolItem } from 'pixi.js';
import { Shape, type ShapeKind, type ShapeOptions } from './shape';

export class Circle extends Shape implements PoolItem {
    radius!: number;
    type: ShapeKind = 'circle';

    init(options: ShapeOptions) {
        super.init(options);
        this.radius = this.sprite.width * 0.5;
    }

    containsPoint(x: number, y: number): boolean {
        const dx = this.sprite.x - x + this.radius;
        const dy = this.sprite.y - y + this.radius;
        const r2 = this.radius * this.radius;
        return (dx * dx + dy * dy) < r2;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    isOutOfBounds(maxY: number): boolean {
        return this.sprite.position.y > maxY;
    }

    // remove() {
    //     // this.sprite.parent?.removeChild(this.sprite);
    //     // this.sprite.destroy();
    // }
}