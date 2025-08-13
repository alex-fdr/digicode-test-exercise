import { ShapeApp } from './app';
import './style.css'

const shapeApp = new ShapeApp();

(async () => {
    await shapeApp.init();
})()