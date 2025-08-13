import { Application, Container, Texture } from 'pixi.js';
import { Circle } from './shapes/circle';
import type { Shape } from './shapes/shape';
import { Spawner } from './spawner';
import { ShapeManager } from './shape-manager';

export class ShapeApp {
    engine: Application;
    // shapes: Shape[] = [];
    // shapesToDelete: Shape[] = [];
    // circlesContainer: Container;
    gravity = 1;
    intervalSpawner: Spawner;
    shapes: ShapeManager;

    constructor() {
        this.engine = new Application();
        this.intervalSpawner = new Spawner(1000, this.engine)
        // this.circlesContainer = new Container();
        this.shapes = new ShapeManager(this.engine);
    }

    async init() {
        await this.engine.init({
            background: '#333333',
            resizeTo: document.body,
            antialias: true,
        });
        
        const root = document.getElementById('app');
        root?.appendChild(this.engine.canvas);

        this.engine.ticker.add(this.update, this);

        this.shapes.init();

        // const circleTexture = Circle.generateTexture(this.engine.renderer);

        // this.engine.stage.addChild(this.circlesContainer);
        this.engine.stage.addChild(this.shapes.containers.circle);

        this.engine.stage.on('spawnShape', () => {
            // this.onSpawnShape(circleTexture);
            this.shapes.spawnCircle();
        });
    }

    // onSpawnShape(texture: Texture) {
    //     const circle = new Circle({
    //         texture: texture,
    //         color: Math.random() * 0xffffff,
    //         x: Math.random() * this.engine.renderer.width,
    //         y: 0,
    //         size: Math.random() + 0.5,
    //     });
    //     this.shapes.push(circle);
    //     this.circlesContainer.addChild(circle.sprite);
    // }

    update() {
        // console.log('update');

        // for (const shape of this.shapes) {
        //     shape.moveDown(this.gravity);

        //     if (shape.isOutOfBounds(this.engine.renderer.height)) {{
        //         this.shapesToDelete.push(shape);
        //     }}
        // }

        // for (let deletedShape of this.shapesToDelete) {
        //     this.shapes.splice(this.shapes.indexOf(deletedShape), 1);
        // }

        // if (this.shapesToDelete.length) {
        //     this.shapesToDelete = [];
        // }

        this.shapes.update(this.gravity);
        this.intervalSpawner.update(this.engine.ticker.deltaMS);
    }
}