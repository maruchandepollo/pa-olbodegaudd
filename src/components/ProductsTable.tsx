import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductDialog } from "./ProductDialog";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductsTableProps {
  products: Product[];
  onUpdate: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({ products, onUpdate, onDelete }: ProductsTableProps) {
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="hidden sm:table-cell">Modelo</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  {search ? "Sin resultados" : "No hay productos registrados"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => {
                const isLow = p.quantity > 0 && p.quantity <= p.low_stock_threshold;
                const isOut = p.quantity === 0;
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      {p.name}
                      <span className="block text-xs text-muted-foreground sm:hidden">
                        {p.model}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {p.model || "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      {isOut ? (
                        <Badge variant="destructive">0</Badge>
                      ) : isLow ? (
                        <Badge className="bg-warning/15 text-warning border-warning/30">
                          {p.quantity}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{p.quantity}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditProduct(p)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("¿Eliminar este producto?")) onDelete(p.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {editProduct && (
        <ProductDialog
          open={!!editProduct}
          onOpenChange={(o) => !o && setEditProduct(null)}
          title="Editar producto"
          initial={{
            name: editProduct.name,
            model: editProduct.model,
            quantity: editProduct.quantity,
          }}
          onSubmit={(data) => {
            onUpdate(editProduct.id, data);
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
}