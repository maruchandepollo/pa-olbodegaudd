import { useState } from "react";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { MovementBadge } from "@/components/ui/badge.variants";
import type { MovementWithProduct } from "@/hooks/use-movements";

interface MovementsHistoryProps {
  movements: MovementWithProduct[];
}

export function MovementsHistory({ movements }: MovementsHistoryProps) {
  const [search, setSearch] = useState("");

  const filtered = movements.filter((m) => {
    const q = search.toLowerCase();
    return (
      (m.products?.name ?? "").toLowerCase().includes(q) ||
      m.person_name.toLowerCase().includes(q) ||
      m.area.toLowerCase().includes(q) ||
      (m.destination_location ?? "").toLowerCase().includes(q)
    );
  });

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por producto, persona o área..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead className="text-center">Cant.</TableHead>
              <TableHead className="hidden sm:table-cell">Persona</TableHead>
              <TableHead className="hidden md:table-cell">Área</TableHead>
              <TableHead className="hidden md:table-cell">Ubicación Destino</TableHead>
              <TableHead className="text-right">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {search ? "Sin resultados" : "No hay movimientos registrados"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <MovementBadge type={m.type}>
                      {m.type === "entry" ? "Ingreso" : "Salida"}
                    </MovementBadge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {m.products?.name ?? "—"}
                  </TableCell>
                  <TableCell className="text-center">{m.quantity}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {m.person_name || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {m.area || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {m.destination_location ? `📍 ${m.destination_location}` : "—"}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {formatDate(m.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}