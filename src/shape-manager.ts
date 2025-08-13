import { Application, Container, Texture } from 'pixi.js';
import { Circle } from './shapes/circle';
import type { Shape, ShapeKind } from './shapes/shape';

export class ShapeManager {
    engine: Application;
    containers!: Record<ShapeKind, Container>;
    textures!: Record<ShapeKind, Texture>;
    shapes: Shape[] = [];
    shapesToDelete: Shape[] = [];

    constructor(engine: Application) {
        this.engine = engine;
    }
    
    init() {
        this.containers = {
            circle: new Container(),
        }
    
        this.textures = {
            circle: Circle.generateTexture(this.engine.renderer),
        }
    }

    spawnCircle() {
        const circle = new Circle({
            texture: this.textures.circle,
            color: Math.random() * 0xffffff,
            x: Math.random() * this.engine.renderer.width,
            y: 0,
            size: Math.random() + 0.5,
        });
        this.shapes.push(circle);
        this.containers.circle.addChild(circle.sprite);
    }

    update(gravity: number) {
        for (const shape of this.shapes) {
            shape.moveDown(gravity);

            if (shape.isOutOfBounds(this.engine.renderer.height)) {{
                this.shapesToDelete.push(shape);
            }}
        }

        for (let deletedShape of this.shapesToDelete) {
            this.shapes.splice(this.shapes.indexOf(deletedShape), 1);
        }

        if (this.shapesToDelete.length) {
            this.shapesToDelete = [];
        }

        console.log(this.shapes.length);
    }
}