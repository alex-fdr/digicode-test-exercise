import { type Texture, Sprite } from 'pixi.js';

// export interface Shape {
//     area(): number;
//     moveDown(number): void;
//     isOutOfBounds(number): boolean;
//     remove(): void;
//     containsPoint(x: number, y: number): boolean;
//     sprite: Sprite;
//     type: ShapeKind;
// };

export type ShapeOptions = {
    texture: Texture;
    x: number;
    y: number;
    size: number;
    color: number;
};

export type ShapeKind = 'circle' | 'square';

export abstract class Shape {
    texture!: Texture;
    sprite!: Sprite;
    abstract type: ShapeKind;

    abstract area(): number;
    abstract containsPoint(x: number, y: number): boolean;
    abstract isOutOfBounds(maxY: number): boolean;
    
    init(options: ShapeOptions) {
        this.texture = options.texture;
        this.sprite = new Sprite(this.texture);
        this.sprite.scale.set(options.size);
        this.sprite.tint = options.color;
        this.sprite.position.set(
            Math.max(0, Math.round(options.x - this.sprite.width)),
            options.y - this.sprite.height
        );    
    }

    moveDown(stepY: number): void {
        this.sprite.position.y += stepY;   
    }
}
