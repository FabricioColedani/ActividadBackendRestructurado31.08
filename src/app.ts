import express, { Application } from 'express';
import { productosRouter } from './productos/productos.routes';
import { categoriasRouter } from './categorias/categorias.routes';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

const app: Application = express();

// Middlewares globales
app.use(express.json());

// Registro de Rutas por Entidad
app.use('/api/v1/productos', productosRouter);
app.use('/api/v1/categorias', categoriasRouter);

// Middlewares de Error y Manejo de Rutas Inexistentes
app.use(notFoundHandler); // Captura solicitudes a rutas no desconocidas (404)
app.use(errorHandler);   // Captura y procesa todos los errores lanzados en la app

export default app;