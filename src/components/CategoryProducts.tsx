import { useState } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Producto, Categoria } from "@/types";

interface Props {
  category: Categoria;
  products: Producto[];
  onEdit: (product: Producto) => void;
  onDelete: (product: Producto) => void;
}

const categoryInfo = {
  clima: { label: "Clima", icon: "❄️", color: "bg-blue-500/10 border-blue-500/20" },
  herramientas: { label: "Herramientas", icon: "🔧", color: "bg-orange-500/10 border-orange-500/20" },
  varios: { label: "Varios", icon: "📦", color: "bg-gray-500/10 border-gray-500/20" },
};

export function CategoryProducts({ category, products, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(true);

  const list = products.filter((p) => p.categoria === category);
  if (list.length === 0) return null;

  const info = categoryInfo[category];

  return (
    <Card className={`overflow-hidden border ${info.color} dark:bg-slate-800`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{info.icon}</span>
          <div className="text-left">
            <p className="font-semibold text-foreground">{info.label}</p>
            <p className="text-xs text-muted-foreground">{list.length} producto(s)</p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="divide-y dark:divide-slate-700">
          {list.map((p) => {
            const isOutOfStock = p.cantidad === 0;

            return (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/30 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{p.nombre}</p>
                  {p.modelo && (
                    <p className="text-xs text-muted-foreground truncate">{p.modelo}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isOutOfStock ? (
                    <Badge variant="destructive">{p.cantidad}</Badge>
                  ) : p.cantidad < 5 ? (
                    <Badge className="bg-warning/15 text-warning border-warning/30">
                      {p.cantidad}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{p.cantidad}</Badge>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => onEdit(p)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => {
                      if (confirm(`¿Eliminar ${p.nombre}?`)) {
                        onDelete(p);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}