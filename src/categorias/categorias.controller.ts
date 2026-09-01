import { Request, Response, NextFunction } from 'express';
import { CategoriasService } from './categorias.service';

export class CategoriasController {
  constructor(private readonly service: CategoriasService) {}

  obtenerTodas = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { nombre } = req.query;
      const categorias = this.service.obtenerTodas(nombre as string);
      res.status(200).json(categorias);
    } catch (error) {
      next(error);
    }
  };

  obtenerPorId = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      const categoria = this.service.buscarPorId(id);
      res.status(200).json(categoria);
    } catch (error) {
      next(error);
    }
  };

  crear = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const nuevaCategoria = this.service.crear(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      next(error);
    }
  };

  actualizar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      const categoriaActualizada = this.service.actualizar(id, req.body);
      res.status(200).json(categoriaActualizada);
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