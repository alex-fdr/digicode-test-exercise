import { ShapeApp } from './app';
import './style.css';

const shapeApp = new ShapeApp({
    gravity: 1,
    spawnIntervalMS: 1000,
});

(async () => {
    await shapeApp.init();
})();