import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CategoryProducts } from "./CategoryProducts";
import { ProductDialog } from "./ProductDialog";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Category = Database["public"]["Enums"]["product_category"];

interface CategoriesViewProps {
  products: Product[];
  onUpdate: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const categories: Category[] = ["clima", "herramientas", "varios"];

export function CategoriesView({ products, onUpdate, onDelete }: CategoriesViewProps) {
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.model.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
  };

  const handleDeleteClick = (product: Product) => {
    if (confirm("¿Eliminar este producto?")) {
      onDelete(product.id);
    }
  };

  // Si no hay productos después de filtrar
  if (filtered.length === 0 && search) {
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
        <div className="text-center py-8 text-muted-foreground">
          Sin resultados
        </div>
      </div>
    );
  }

  // Si no hay productos en total
  if (products.length === 0) {
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
        <div className="text-center py-8 text-muted-foreground">
          No hay productos registrados
        </div>
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

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category}>
            <CategoryProducts
              category={category}
              products={filtered}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        ))}
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
            category: editProduct.category as Category,
            location: editProduct.location ?? "",
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
