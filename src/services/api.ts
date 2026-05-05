const API_URL = "http://localhost:3000";

// ================= PRODUCTOS =================

export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);

  if (!res.ok) throw new Error("Error al obtener productos");

  return res.json();
}

export async function crearProducto(data: any) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "Error al crear producto");

  return result;
}

export async function actualizarProducto(id: number, data: any) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "Error al actualizar producto");

  return result;
}

export async function eliminarProducto(id: number) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
}

// ================= MOVIMIENTOS =================

export async function getMovimientos() {
  const res = await fetch(`${API_URL}/movimientos`);

  if (!res.ok) throw new Error("Error al obtener movimientos");

  return res.json();
}

export async function crearMovimiento(data: any) {
  const res = await fetch(`${API_URL}/movimientos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "Error al crear movimiento");

  return result;
}