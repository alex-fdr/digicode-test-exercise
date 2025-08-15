import type { PoolItem } from 'pixi.js';
import { Shape, type ShapeKind, type ShapeOptions } from './shape';

export class Circle extends Shape {
    radius!: number;
    type: ShapeKind = 'circle';

    init(options: ShapeOptions) {
        super.init(options);
        this.radius = this.width * 0.5;
    }

    isPointInside(x: number, y: number): boolean {
        const dx = this.x - x + this.radius;
        const dy = this.y - y + this.radius;
        const r2 = this.radius * this.radius;
        return (dx * dx + dy * dy) < r2;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}