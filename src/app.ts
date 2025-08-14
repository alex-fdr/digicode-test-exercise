import { Application } from 'pixi.js';
import { Spawner } from './spawner';
import { ShapeManager } from './shape-manager';
import type { Config } from './config';

export class ShapeApp {
    engine: Application;
    intervalSpawner: Spawner;
    shapeManager: ShapeManager;
    config: Config;

    constructor(config: Config) {
        this.config = config;
        this.engine = new Application();
        this.intervalSpawner = new Spawner(this.config.spawnIntervalMS, this.engine)
        this.shapeManager = new ShapeManager(this.engine);
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

        this.shapeManager.init();

        this.engine.stage.on('spawnShape', () => {
            for (let i = 0; i < this.config.shapesPerSecond; i++) {
                this.shapeManager.spawnRandomShape();
            }
        });

        this.engine.canvas.addEventListener('pointerdown', (event) => {
            const intersected = this.shapeManager.handleClick(event.clientX, event.clientY);

            if (!intersected) {
                this.shapeManager.spawnRandomShape(event.clientX, event.clientY);
            }
        });
    }

    update() {
        this.shapeManager.update(this.config.gravity);
        this.intervalSpawner.update(this.engine.ticker.deltaMS);
    }
}