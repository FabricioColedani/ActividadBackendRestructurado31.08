import { db } from '../config/database';
import { Categoria } from './categoria.entity';

export class CategoriasRepository {
  obtenerTodas(filtroNombre?: string): Categoria[] {
    if (filtroNombre) {
      return db
        .prepare('SELECT * FROM categorias WHERE nombre LIKE ?')
        .all(`%${filtroNombre}%`) as Categoria[];
    }
    return db.prepare('SELECT * FROM categorias').all() as Categoria[];
  }

  buscarPorId(id: number): Categoria | undefined {
    return db
      .prepare('SELECT * FROM categorias WHERE id = ?')
      .get(id) as Categoria | undefined;
  }

  guardar(categoria: Omit<Categoria, 'id'>): Categoria {
    const stmt = db.prepare('INSERT INTO categorias (nombre) VALUES (?)');
    const info = stmt.run(categoria.nombre);
    return { id: Number(info.lastInsertRowid), ...categoria };
  }

  actualizar(id: number, datos: Partial<Categoria>): boolean {
    const stmt = db.prepare(
      'UPDATE categorias SET nombre = COALESCE(?, nombre) WHERE id = ?'
    );
    const info = stmt.run(datos.nombre, id);
    return info.changes > 0;
  }

  eliminar(id: number): boolean {
    const stmt = db.prepare('DELETE FROM categorias WHERE id = ?').run(id);
    return stmt.changes > 0;
  }
}