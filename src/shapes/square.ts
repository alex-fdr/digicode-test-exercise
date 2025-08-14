import { Sprite, Texture } from 'pixi.js';
import type { Shape, ShapeOptions } from './shape';

export class Square implements Shape {
    texture: Texture;
    sprite: Sprite;
    width: number;

    constructor(options: ShapeOptions) {
        this.texture = options.texture;

        this.sprite = new Sprite(this.texture);
        this.sprite.scale.set(options.size);
        this.sprite.tint = options.color;

        this.sprite.position.set(
            Math.max(0, Math.round(options.x - this.sprite.width)),
            options.y - this.sprite.height
        );

        this.width = this.sprite.width;
    }

    containsPoint(x: number, y: number): boolean {
        return this.sprite.getBounds().containsPoint(x, y);
    }

    area(): number {
        return this.width * this.width;
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