import { Producto } from "@/types";
import { Card } from "@/components/ui/card";
import { Package, Archive, AlertCircle } from "lucide-react";

export function StatsCards({ products }: { products: Producto[] }) {
  const total = products.length;
  const stock = products.reduce((acc, p) => acc + p.cantidad, 0);
  const low = products.filter((p) => p.cantidad === 0).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Productos</p>
            <p className="text-2xl font-bold text-foreground">{total}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Archive className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Total Stock</p>
            <p className="text-2xl font-bold text-foreground">{stock}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Sin Stock</p>
            <p className="text-2xl font-bold text-destructive">{low}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}