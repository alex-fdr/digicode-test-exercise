import { Application, Container, Graphics, Pool, type Texture } from 'pixi.js';
import { Square } from '../shapes/square';
import { ShapeFactory } from './shape-factory';

export class SquareFactory extends ShapeFactory {
    pool: Pool<Square>;

    constructor(engine: Application, container: Container) {
        super(engine, container);
        this.pool = new Pool(Square, this.poolSize);
    }

    generateTexture(): Texture {
        const graphics = new Graphics();
        graphics.beginPath();
        graphics.rect(0, 0, 64, 64);
        graphics.fill({ color: 0xffffff, alpha: 1 });
        const texture = this.engine.renderer.generateTexture(graphics);
        graphics.destroy(true);
        return texture;
    }
}