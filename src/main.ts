import { ShapeApp } from './app';
import { Config } from './config';
import './style.css';

const shapeApp = new ShapeApp(new Config());

(async () => {
    await shapeApp.init();
})();
