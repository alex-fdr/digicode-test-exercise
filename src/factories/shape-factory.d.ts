export interface ShapeFactory {
    init(): void;
    spawn(x?: number, y?: number): Shape;   
}