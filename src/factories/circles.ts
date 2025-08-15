import { Application, Container, Graphics, Pool, type Texture } from 'pixi.js';
import { Circle } from '../shapes/circle';
import { ShapeFactory } from './shape-factory';

export class CircleFactory extends ShapeFactory {
    pool: Pool<Circle>;

    constructor(engine: Application, container: Container) {
        super(engine, container);
        this.pool = new Pool(Circle, this.poolSize);
        this.pool.prepopulate(this.poolSize * 0.5);
    }

    generateTexture(): Texture {
        const graphics = new Graphics();
        graphics.beginPath();
        graphics.circle(32, 32, 64);
        graphics.fill({ color: 0xffffff, alpha: 1 });
        const texture = this.engine.renderer.generateTexture(graphics);
        graphics.destroy(true);
        return texture;
    }
}