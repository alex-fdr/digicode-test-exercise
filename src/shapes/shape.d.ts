import type { Color, Point, Texture, Sprite } from 'pixi.js';

export interface Shape {
    area(): number;
    moveDown(number): void;
    isOutOfBounds(number): boolean;
    remove(): void;
    containsPoint(x: number, y: number): boolean;
    sprite: Sprite;
};

export type ShapeOptions = {
    texture: Texture;
    x: number;
    y: number;
    size: number;
    color: number;
};

export type ShapeKind = 'circle' | 'square';