import { Application } from 'pixi.js';
import { Spawner } from './spawner';
import { ShapeManager } from './shape-manager';
import type { Config } from './config';
import { UI } from './ui';

export class ShapeApp {
    engine: Application;
    intervalSpawner: Spawner;
    shapeManager: ShapeManager;
    config: Config;
    ui: UI;

    constructor(config: Config) {
        this.config = config;
        this.engine = new Application();
        this.ui = new UI(this.config);
        this.intervalSpawner = new Spawner(this.config.spawnIntervalMS, this.engine)
        this.shapeManager = new ShapeManager(this.engine, this.ui);
    }

    async init() {
        await this.engine.init({
            background: '#333333',
            resizeTo: document.getElementById('app')!,
            antialias: true,
        });
        
        const root = document.getElementById('app');
        root?.appendChild(this.engine.canvas);

        this.engine.ticker.add(this.update, this);

        this.shapeManager.init();

        let stopSpawn = false;

        document.addEventListener('keypress', (event) => {
            console.log(event.key)
            if (event.key === '1') {
                stopSpawn = !stopSpawn;
            }
        })

        this.engine.stage.on('spawnShape', () => {
            if (stopSpawn) {
                return;
            }

            for (let i = 0; i < this.config.shapesPerSecond; i++) {
                this.shapeManager.spawnRandomShape();
            }
        });

        this.engine.canvas.addEventListener('pointerdown', (event) => {
            const intersected = this.shapeManager.handleClick(event.offsetX, event.offsetY);

            if (!intersected) {
                this.shapeManager.spawnRandomShape(event.offsetX, event.offsetY);
            }
        });
    }

    update() {
        this.shapeManager.update(this.config.gravity);
        this.intervalSpawner.update(this.engine.ticker.deltaMS);
    }
}