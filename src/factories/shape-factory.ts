// export interface ShapeFactory {
//     init(): void;
//     spawn(x?: number, y?: number): Shape;
//     return(shape: Shape): void;
// }

import type { Application, Container, Pool, Texture } from 'pixi.js';
import type { Shape } from '../shapes/shape';

export abstract class ShapeFactory {
    engine: Application;
    container: Container;
    texture: Texture;
    poolSize = 100;
    abstract pool: Pool<Shape>;

    constructor(engine: Application, container: Container) {
        this.engine = engine;
        this.container = container;
        this.texture = this.generateTexture();
        this.engine.stage.addChild(this.container);
    }

    abstract generateTexture(): Texture;

    spawn(x?: number, y?: number): Shape {
        const posX = x ?? Math.random() * this.engine.renderer.width;
        const posY = y ?? 0;

        const shape = this.pool.get({
            texture: this.texture,
            color: Math.random() * 0xffffff,
            x: posX,
            y: posY,
            size: Math.random() + 0.5,
        });

        this.container.addChild(shape.sprite);
        return shape;
    }

    return(shape: Shape) {
        this.pool.return(shape);
        this.container.removeChild(shape.sprite);
    }
} 