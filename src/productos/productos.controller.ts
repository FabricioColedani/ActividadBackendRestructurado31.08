import { Request, Response, NextFunction } from 'express';
import { ProductosService } from './productos.service';

export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  obtenerTodos = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { nombre } = req.query;
      const productos = this.service.obtenerTodos(nombre as string);
      res.status(200).json(productos);
    } catch (error) {
      next(error);
    }
  };

  obtenerPorId = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      const producto = this.service.buscarPorId(id);
      res.status(200).json(producto);
    } catch (error) {
      next(error);
    }
  };

  crear = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const nuevoProducto = this.service.crear(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      next(error);
    }
  };

  actualizar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      const productoActualizado = this.service.actualizar(id, req.body);
      res.status(200).json(productoActualizado);
    } catch (error) {
      next(error);
    }
  };

  eliminar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      this.service.eliminar(id);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  };
}