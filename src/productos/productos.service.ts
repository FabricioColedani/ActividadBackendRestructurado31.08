import { ProductosRepository } from './productos.repository';
import { Producto } from './producto.entity';
import { CrearProductoDto, ActualizarProductoDto } from './producto.dto';
import { AppError } from '../errors/app-error';

export class ProductosService {
  constructor(private readonly repository: ProductosRepository) {}

  obtenerTodos(filtroNombre?: string): Producto[] {
    return this.repository.obtenerTodos(filtroNombre);
  }

  buscarPorId(id: number): Producto {
    this.validarId(id);

    const producto = this.repository.buscarPorId(id);
    if (!producto) {
      throw new AppError('Producto no encontrado', 404);
    }

    return producto;
  }

  crear(dto: CrearProductoDto): Producto {
    // Regla de validación: Título/Nombre obligatorio (422)
    if (!dto.nombre || dto.nombre.trim() === '') {
      throw new AppError('El nombre del producto es obligatorio', 422);
    }

    if (dto.precio === undefined || dto.precio < 0) {
      throw new AppError('El precio debe ser un número mayor o igual a 0', 422);
    }

    return this.repository.guardar({
      nombre: dto.nombre.trim(),
      precio: dto.precio,
      categoriaId: dto.categoriaId
    });
  }

  actualizar(id: number, dto: ActualizarProductoDto): Producto {
    this.validarId(id);

    // Verificar si el producto existe antes de actualizar
    const productoExistente = this.repository.buscarPorId(id);
    if (!productoExistente) {
      throw new AppError('Producto no encontrado para actualizar', 404);
    }

    // Validar si envían un nombre vacío
    if (dto.nombre !== undefined && dto.nombre.trim() === '') {
      throw new AppError('El nombre del producto no puede estar vacío', 422);
    }

    this.repository.actualizar(id, dto);

    // Retornar la versión actualizada
    return this.repository.buscarPorId(id)!;
  }

  eliminar(id: number): void {
    this.validarId(id);

    const eliminado = this.repository.eliminar(id);
    if (!eliminado) {
      throw new AppError('Producto no encontrado para eliminar', 404);
    }
  }

  private validarId(id: number): void {
    if (isNaN(id) || id <= 0) {
      throw new AppError('El ID proporcionado es inválido', 400);
    }
  }
}