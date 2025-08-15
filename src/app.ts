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

    async init(): Promise<void> {
        await this.engine.init({
            background: '#333333',
            resizeTo: document.getElementById('app')!,
            antialias: true,
        });
        
        const root = document.getElementById('app');
        root?.appendChild(this.engine.canvas);

        this.engine.ticker.add(this.update, this);

        this.shapeManager.init();

        this.engine.stage.on('spawnShape', this.onShapeSpawn, this);
        this.engine.canvas.addEventListener('pointerdown', this.onCanvasInteraction.bind(this));
    }

    private onShapeSpawn(): void {
        for (let i = 0; i < this.config.shapesPerSecond; i++) {
            const x = Math.random() * this.engine.renderer.width;
            const y = 0;
            this.shapeManager.spawnRandomShape(x, y);
        }
    }

    private onCanvasInteraction(event: PointerEvent): void {
        const intersected = this.shapeManager.handleClick(event.offsetX, event.offsetY);

        if (!intersected) {
            this.shapeManager.spawnRandomShape(event.offsetX, event.offsetY);
        }
    }

    update(): void {
        this.shapeManager.update(this.config.gravity);
        this.intervalSpawner.update(this.engine.ticker.deltaMS);
    }
}