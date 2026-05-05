import { useState } from "react";
import { CategoryProducts } from "./CategoryProducts";
import { Producto, Categoria } from "@/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories: Categoria[] = ["clima", "herramientas", "varios"];

export function CategoriesView({ products, onUpdate, onDelete }: any) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p: Producto) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.modelo.toLowerCase().includes(search.toLowerCase())
  );

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Sin resultados de búsqueda</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((c) => (
            <CategoryProducts
              key={c}
              category={c}
              products={filtered}
              onEdit={(p: Producto) => onUpdate(p.id, p)}
              onDelete={(p: Producto) => onDelete(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}