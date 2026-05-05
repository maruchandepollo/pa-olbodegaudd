import { Movimiento } from "@/types";

export function MovementsHistory({ movements }: { movements: Movimiento[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Persona</th>
          <th>Área</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((m) => (
          <tr key={m.id}>
            <td>{m.tipo}</td>
            <td>{m.producto_id}</td>
            <td>{m.cantidad}</td>
            <td>{m.persona}</td>
            <td>{m.area}</td>
            <td>{m.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}