import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { normalizeProducts } from "@/lib/product-utils";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("category")
      .order("name");
    if (!error && data) {
      setProducts(normalizeProducts(data));
    }
    setLoading(false);
  }

  async function addProduct(product: ProductInsert) {
    const { error } = await supabase.from("products").insert(product);
    if (error) throw error;
  }

  async function updateProduct(id: string, updates: Partial<Product>) {
    const { error } = await supabase
      .from("products")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  }

  return { products, loading, addProduct, updateProduct, deleteProduct, refetch: fetchProducts };
}