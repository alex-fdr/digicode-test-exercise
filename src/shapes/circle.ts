import { Graphics, Sprite, Texture, type Renderer } from 'pixi.js';
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
        // this.sprite.position.copyFrom(options.position);
        this.sprite.tint = options.color;

        // this.sprite.position.x = Math.max(0, Math.round(this.sprite.position.x - this.sprite.width));
        // this.sprite.position.y -= this.sprite.height;
        
        this.sprite.position.set(
            Math.max(0, Math.round(options.x - this.sprite.width)),
            options.y - this.sprite.height
        );

        this.radius = this.sprite.width * 0.5;
    }

    static generateTexture(renderer: Renderer): Texture {
        const circleGraphics = new Graphics();
        circleGraphics.beginPath();
        circleGraphics.circle(25, 25, 50);
        circleGraphics.fill({ color: 0xffffff, alpha: 1 });
        return renderer.generateTexture(circleGraphics);
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
}