import type { Application } from 'pixi.js';

export class Spawner {
    interval: number;
    elapsed = 0;
    engine: Application;

    constructor(interval: number, engine: Application) {
        this.interval = interval;
        this.engine = engine;
    }

    update(dt: number): void {
        this.elapsed += dt;

        if (this.elapsed >= this.interval) {
            this.elapsed = 0;
            this.engine.stage.emit('spawnShape');
        }
    }
}