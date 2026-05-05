import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Search } from "lucide-react";
import { Movimiento } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function MovementsHistory({ movements }: { movements: Movimiento[] }) {
  const [search, setSearch] = useState("");

  const filtered = movements.filter((m) =>
    m.persona.toLowerCase().includes(search.toLowerCase()) ||
    m.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por persona o área..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Sin movimientos registrados</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Persona</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    {m.tipo === "entrada" ? (
                      <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                        <ArrowDownCircle className="h-3 w-3 mr-1" />
                        Ingreso
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20">
                        <ArrowUpCircle className="h-3 w-3 mr-1" />
                        Salida
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{m.cantidad}</TableCell>
                  <TableCell>{m.persona}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.area || "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.destination_location || "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(m.fecha).toLocaleDateString("es-AR", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}