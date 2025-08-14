import { Application, Container, Graphics, type Texture } from 'pixi.js';
import { Circle } from '../shapes/circle';
import type { ShapeFactory } from './shape-factory';

export class CircleFactory implements ShapeFactory {
    engine: Application;
    container!: Container;
    texture!: Texture;
    // graphics!: Graphics;

    constructor(engine: Application) {
        this.engine = engine;
        this.container = new Container();
        this.texture = this.generateTexture();
        this.engine.stage.addChild(this.container);
    }

    init() {
    }

    private generateTexture(): Texture {
        const graphics = new Graphics();
        graphics.beginPath();
        graphics.circle(25, 25, 50);
        graphics.fill({ color: 0xffffff, alpha: 1 });
        const texture = this.engine.renderer.generateTexture(graphics);
        graphics.destroy(true);
        return texture;
    }

    spawn(x?: number, y?: number): Circle {
        const posX = x ?? Math.random() * this.engine.renderer.width;
        const posY = y ?? 0;
        const circle = new Circle({
            texture: this.texture,
            color: Math.random() * 0xffffff,
            x: posX,
            y: posY,
            size: Math.random() + 0.5,
        })

        this.container.addChild(circle.sprite);
        return circle;
    }
}