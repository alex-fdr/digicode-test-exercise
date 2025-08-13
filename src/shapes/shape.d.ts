import type { Color, Point, Texture } from 'pixi.js';

export interface Shape {
    area(): number;
    moveDown(number): void;
    isOutOfBounds(number): boolean;
}

export type ShapeOptions = {
    texture: Texture,
    x: number,
    y: number,
    size: number,
    color: number,
}

export type ShapeKind = 'circle'