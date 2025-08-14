import { Application } from 'pixi.js';
import { CircleFactory } from './factories/circles';
import { SquareFactory } from './factories/squares';
import type { ShapeFactory } from './factories/shape-factory';
import type { Shape, ShapeKind } from './shapes/shape';

export class ShapeManager {
    engine: Application;
    shapes: Shape[] = [];
    shapesToDelete: Shape[] = [];
    factories!: Record<ShapeKind, ShapeFactory>;
    
    constructor(engine: Application) {
        this.engine = engine;
    }
    
    init() {
        this.factories = {
            circle: new CircleFactory(this.engine),
            square: new SquareFactory(this.engine),
        }
    }

    spawnRandomShape(x?: number, y?: number) {
        const allTypes = Object.keys(this.factories) as Array<ShapeKind>;
        const index = Math.floor(Math.random() * allTypes.length);
        const type = allTypes[index];
        const shape = this.factories[type].spawn(x, y);
        this.shapes.push(shape);
    }

    handleClick(x: number, y: number): boolean {
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (shape.containsPoint(x, y)) {
                this.shapesToDelete.push(shape);
                return true;
            }
        }

        return false;
    }

    update(gravity: number) {
        for (const shape of this.shapes) {
            shape.moveDown(gravity);

            if (shape.isOutOfBounds(this.engine.renderer.height)) {{
                this.shapesToDelete.push(shape);
            }}
        }

        for (const deletedShape of this.shapesToDelete) {
            deletedShape.remove();
            const index = this.shapes.indexOf(deletedShape);
            this.shapes.splice(index, 1);
        }

        if (this.shapesToDelete.length) {
            this.shapesToDelete = [];
        }

        // console.log(this.shapes.length);
    }
}