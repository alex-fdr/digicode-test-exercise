import { Sprite, Texture } from 'pixi.js';
import type { Shape, ShapeOptions } from './shape';

export class Circle implements Shape {
    texture: Texture;
    sprite: Sprite;
    radius: number;

    constructor(options: ShapeOptions) {
        this.texture = options.texture;

        this.sprite = new Sprite(this.texture);
        // this.sprite.anchor.set(0.5);
        this.sprite.scale.set(options.size);
        this.sprite.tint = options.color;

        this.sprite.position.set(
            Math.max(0, Math.round(options.x - this.sprite.width)),
            options.y - this.sprite.height
        );

        this.radius = this.sprite.width * 0.5;
    }

    containsPoint(x: number, y: number): boolean {
        // return this.sprite.getBounds().containsPoint(x, y);
        const dx = this.sprite.x - x + this.radius;
        const dy = this.sprite.y - y + this.radius;
        const r2 = this.radius * this.radius;
        return (dx * dx + dy * dy) < r2;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    moveDown(stepY: number): void {
        this.sprite.position.y += stepY;
    }

    isOutOfBounds(maxY: number): boolean {
        return this.sprite.position.y > maxY;
    }

    remove() {
        this.sprite.destroy();
    }
}