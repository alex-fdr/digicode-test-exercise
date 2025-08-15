import { type PoolItem, type Texture, Sprite } from 'pixi.js';

export type ShapeOptions = {
    texture: Texture;
    x: number;
    y: number;
    size: number;
    color: number;
};

export type ShapeKind = 'circle' | 'square';

export abstract class Shape extends Sprite implements PoolItem {
    abstract type: ShapeKind;
    abstract area(): number;
    abstract isPointInside(x: number, y: number): boolean;

    constructor() {
        super();
    }
    
    init(options: ShapeOptions) {
        this.texture = options.texture;
        this.scale.set(options.size);
        this.tint = options.color;
        this.position.set(
            Math.max(0, Math.round(options.x - this.width)),
            options.y - this.height
        );    
    }

    moveDown(stepY: number): void {
        this.position.y += stepY;   
    }
    
    isOutOfBounds(maxY: number): boolean {
        return this.position.y > maxY;
    }

    reset() {
        this.parent?.removeChild(this);
    }
}
