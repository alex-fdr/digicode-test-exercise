import { Application, Container } from 'pixi.js';
import { CircleFactory } from './factories/circles';
import { SquareFactory } from './factories/squares';
import { Shape, type ShapeKind } from './shapes/shape';
import type { ShapeFactory } from './factories/shape-factory';

export class ShapeManager {
    engine: Application;
    shapes: Shape[] = [];
    shapesToDelete: Shape[] = [];
    container = new Container();
    factories!: Record<ShapeKind, ShapeFactory>;
    
    constructor(engine: Application) {
        this.engine = engine;
    }
    
    init() {
        this.factories = {
            circle: new CircleFactory(this.engine, this.container),
            square: new SquareFactory(this.engine, this.container),
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
                this.removeShape(shape, i);
                return true;
            }
        }

        return false;
    }

    update(gravity: number) {
        for (let i = 0; i < this.shapes.length; i++) {
            const shape = this.shapes[i];
            shape.moveDown(gravity);

            if (shape.isOutOfBounds(this.engine.renderer.height)) {{
                this.removeShape(shape, i);
            }}
        }

        // console.log('TOTAL SHAPES', this.totalShapes);
    }

    removeShape(shape: Shape, index: number) {
        this.shapes.splice(index, 1);
        this.factories[shape.type].return(shape);
    }
}