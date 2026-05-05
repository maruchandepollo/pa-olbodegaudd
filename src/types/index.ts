export type Categoria = "clima" | "herramientas" | "varios";

export interface Producto {
  id: number;
  nombre: string;
  modelo: string;
  cantidad: number;
  categoria?: Categoria;
  ubicacion?: string;
}

export interface Movimiento {
  id: number;
  producto_id: number;
  tipo: "entrada" | "salida";
  cantidad: number;
  persona: string;
  area: string;
  fecha: string;
}