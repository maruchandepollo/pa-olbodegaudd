import { Package, ArrowDownCircle, ArrowUpCircle, AlertTriangle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface StatsCardsProps {
  products: Product[];
}

export function StatsCards({ products }: StatsCardsProps) {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity <= p.low_stock_threshold);
  const outOfStock = products.filter((p) => p.quantity === 0);

  const stats = [
    {
      label: "Productos",
      value: totalProducts,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Unidades en stock",
      value: totalStock,
      icon: ArrowDownCircle,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Stock bajo",
      value: lowStock.length,
      icon: AlertTriangle,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Sin stock",
      value: outOfStock.length,
      icon: ArrowUpCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}