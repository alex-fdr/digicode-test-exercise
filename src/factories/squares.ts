import { Application, Container, Graphics, type Texture } from 'pixi.js';
import { Square } from '../shapes/square';
import type { ShapeFactory } from './shape-factory';

export class SquareFactory implements ShapeFactory {
    engine: Application;
    container!: Container;
    texture!: Texture;
    // graphics!: Graphics;

    constructor(engine: Application) {
        this.engine = engine;
        this.container = new Container();
        this.container.sortableChildren = true;
        this.texture = this.generateTexture();
        this.engine.stage.addChild(this.container);
    }

    init() {
    }

    private generateTexture(): Texture {
        const graphics = new Graphics();
        graphics.beginPath();
        graphics.rect(0, 0, 50, 50);
        graphics.fill({ color: 0xffffff, alpha: 1 });
        const texture = this.engine.renderer.generateTexture(graphics);
        graphics.destroy(true);
        return texture;
    }

    spawn(x?: number, y?: number): Square {
        const posX = x ?? Math.random() * this.engine.renderer.width;
        const posY = y ?? 0;
        const square = new Square({
            texture: this.texture,
            color: Math.random() * 0xffffff,
            x: posX,
            y: posY,
            size: Math.random() + 0.5,
        })

        this.container.addChild(square.sprite);
        return square;
    }
}