export interface CrearProductoDto {
  nombre: string;
  precio: number;
  categoriaId?: number;
}

export interface ActualizarProductoDto {
  nombre?: string;
  precio?: number;
  categoriaId?: number;
}