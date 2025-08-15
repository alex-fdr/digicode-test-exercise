import { Application, Container } from 'pixi.js';
import { CircleFactory } from './factories/circles';
import { SquareFactory } from './factories/squares';
import { Shape, type ShapeKind } from './shapes/shape';
import type { ShapeFactory } from './factories/shape-factory';
import type { UI } from './ui';

export class ShapeManager {
    engine: Application;
    container: Container<Shape> = new Container();
    factories!: Record<ShapeKind, ShapeFactory>;
    ui: UI;
    totalArea = 0;
    
    constructor(engine: Application, ui: UI) {
        this.engine = engine;
        this.ui = ui;
    }
    
    init(): void {
        this.factories = {
            circle: new CircleFactory(this.engine, this.container),
            square: new SquareFactory(this.engine, this.container),
        }
    }

    spawnRandomShape(x: number, y: number): void {
        const allTypes = Object.keys(this.factories) as Array<ShapeKind>;
        const index = Math.floor(Math.random() * allTypes.length);
        const type = allTypes[index];
        const shape = this.factories[type].spawn(x, y);

        this.totalArea += shape.area();
        this.ui.updateTotalArea(this.totalArea);
        this.ui.updateTotalShapes(this.container.children.length);
    }

    handleClick(x: number, y: number): boolean {
        for (let i = this.container.children.length - 1; i >= 0; i--) {
            const shape = this.container.getChildAt<Shape>(i);

            if (shape.isPointInside(x, y)) {
                this.removeShape(shape);
                return true;
            }
        }

        return false;
    }

    update(gravity: number): void {
        for (let i = 0; i < this.container.children.length; i++) {
            const shape = this.container.getChildAt<Shape>(i);
            shape.moveDown(gravity);

            if (shape.isOutOfBounds(this.engine.renderer.height)) {{
                this.removeShape(shape);
            }}
        }
    }

    removeShape(shape: Shape): void {
        this.factories[shape.type].return(shape);
        this.totalArea -= shape.area();
        this.ui.updateTotalArea(this.totalArea);
        this.ui.updateTotalShapes(this.container.children.length);
    }
}