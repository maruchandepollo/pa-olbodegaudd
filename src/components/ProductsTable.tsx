import { Producto } from "@/types";

export function ProductsTable({ products, onDelete }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Modelo</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p: Producto) => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td>{p.modelo}</td>
            <td>{p.cantidad}</td>
            <td>
              <button onClick={() => onDelete(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}