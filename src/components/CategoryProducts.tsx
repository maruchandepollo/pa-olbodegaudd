import { useState } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Category = Database["public"]["Enums"]["product_category"];

interface CategoryProductsProps {
  category: Category;
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const categoryLabels: Record<Category, string> = {
  clima: "Clima",
  herramientas: "Herramientas",
  varios: "Varios",
};

const categoryIcons: Record<Category, string> = {
  clima: "❄️",
  herramientas: "🔧",
  varios: "📦",
};

export function CategoryProducts({
  category,
  products,
  onEdit,
  onDelete,
}: CategoryProductsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const categoryProducts = products.filter((p) => {
    return p.category === category;
  });

  if (categoryProducts.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden dark:border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted transition-colors dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{categoryIcons[category]}</span>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{categoryLabels[category]}</h3>
            <p className="text-xs text-muted-foreground">{categoryProducts.length} producto(s)</p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="divide-y dark:divide-slate-700">
          {categoryProducts.map((product) => {
            const isLow =
              product.quantity > 0 && product.quantity <= product.low_stock_threshold;
            const isOut = product.quantity === 0;

            return (
              <div
                key={product.id}
                className="px-4 py-3 hover:bg-muted/50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    {product.model && (
                      <p className="text-xs text-muted-foreground truncate">{product.model}</p>
                    )}
                    {product.location && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📍 {product.location}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isOut ? (
                      <Badge variant="destructive">0</Badge>
                    ) : isLow ? (
                      <Badge className="bg-warning/15 text-warning border-warning/30">
                        {product.quantity}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">{product.quantity}</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
