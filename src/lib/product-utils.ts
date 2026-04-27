import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Category = Database["public"]["Enums"]["product_category"];

export function normalizeProduct(product: Product): Product {
  return {
    ...product,
    category: (product.category || "varios") as Category,
  };
}

export function normalizeProducts(products: Product[]): Product[] {
  return products.map(normalizeProduct);
}
