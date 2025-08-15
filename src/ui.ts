import type { Config } from './config';

export class UI {
    totalShapes: HTMLElement;
    totalArea: HTMLElement;
    shapesPerSecond: HTMLElement;
    gravity: HTMLElement;
    config: Config;

    constructor(config: Config) {
        this.config = config;
        this.totalShapes = document.getElementById('total-shapes')!;
        this.totalArea = document.getElementById('total-area')!;
        this.shapesPerSecond = document.getElementById('shapes-per-second')!;
        this.gravity = document.getElementById('gravity')!;

        this.updateGravityValue(config.gravity);
        this.updateShapesPerSecondValue(config.shapesPerSecond);

        const gravityDecrease = document.getElementById('gravity-decrease')!;
        const gravityIncrease = document.getElementById('gravity-increase')!;
        gravityDecrease.addEventListener('pointerdown', this.decreaseGravity.bind(this));
        gravityIncrease.addEventListener('pointerdown', this.increaseGravity.bind(this));

        const shapesDecrease = document.getElementById('shapes-decrease')!;
        const shapesIncrease = document.getElementById('shapes-increase')!;
        shapesDecrease.addEventListener('pointerdown', this.decreaseShapesPerSecond.bind(this));
        shapesIncrease.addEventListener('pointerdown', this.increaseShapesPerSecond.bind(this));
    }

    decreaseShapesPerSecond() {
        this.config.shapesPerSecond = Math.max(1, this.config.shapesPerSecond - 1);
        this.updateShapesPerSecondValue(this.config.shapesPerSecond);
    }

    increaseShapesPerSecond() {
        this.config.shapesPerSecond = Math.min(1000, this.config.shapesPerSecond + 1);
        this.updateShapesPerSecondValue(this.config.shapesPerSecond);
    }
    
    decreaseGravity() {
        this.config.gravity = Math.max(1, this.config.gravity - 1);
        this.updateGravityValue(this.config.gravity);
    }

    increaseGravity() {
        this.config.gravity = Math.min(100, this.config.gravity + 1);
        this.updateGravityValue(this.config.gravity);
    }

    updateTotalShapes(value: number) {
        this.totalShapes.innerText = value.toString();
    }

    updateTotalArea(value: number) {
        this.totalArea.innerText = Math.floor(value) + 'px';
    }

    updateShapesPerSecondValue(value: number) {
        this.shapesPerSecond.innerText = value.toString();
    }

    updateGravityValue(value: number) {
        this.gravity.innerText = value.toString();
    }
}