import { useState } from "react";
import { Producto } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  products: Producto[];
  onSubmit: (data: any) => void;
}

export function MovementDialog({ open, onClose, products, onSubmit }: Props) {
  const [producto_id, setProducto] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "salida">("salida");
  const [cantidad, setCantidad] = useState(1);
  const [persona, setPersona] = useState("");
  const [area, setArea] = useState("");

  function submit(e: any) {
    e.preventDefault();

    onSubmit({
      producto_id: Number(producto_id),
      tipo,
      cantidad,
      persona,
      area,
    });

    onClose();
  }

  return (
    open && (
      <form onSubmit={submit}>
        <select onChange={(e) => setProducto(e.target.value)}>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTipo(e.target.value as any)}>
          <option value="salida">Salida</option>
          <option value="entrada">Ingreso</option>
        </select>

        <input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />

        <input placeholder="Persona" onChange={(e) => setPersona(e.target.value)} />

        <input placeholder="Área" onChange={(e) => setArea(e.target.value)} />

        <button type="submit">Guardar</button>
      </form>
    )
  );
}