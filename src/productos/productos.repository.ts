import { db } from '../config/database';
import { Producto } from './producto.entity';

export class ProductosRepository {
  obtenerTodos(filtroNombre?: string): Producto[] {
    if (filtroNombre) {
      return db
        .prepare('SELECT * FROM productos WHERE nombre LIKE ?')
        .all(`%${filtroNombre}%`) as Producto[];
    }
    return db.prepare('SELECT * FROM productos').all() as Producto[];
  }

  buscarPorId(id: number): Producto | undefined {
    return db
      .prepare('SELECT * FROM productos WHERE id = ?')
      .get(id) as Producto | undefined;
  }

  guardar(producto: Omit<Producto, 'id'>): Producto {
    const stmt = db.prepare('INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)');
    const info = stmt.run(producto.nombre, producto.precio, producto.categoriaId);
    return { id: Number(info.lastInsertRowid), ...producto };
  }

  actualizar(id: number, datos: Partial<Producto>): boolean {
    const stmt = db.prepare(
      'UPDATE productos SET nombre = COALESCE(?, nombre), precio = COALESCE(?, precio) WHERE id = ?'
    );
    const info = stmt.run(datos.nombre, datos.precio, id);
    return info.changes > 0;
  }

  eliminar(id: number): boolean {
    const stmt = db.prepare('DELETE FROM productos WHERE id = ?').run(id);
    return stmt.changes > 0;
  }
}