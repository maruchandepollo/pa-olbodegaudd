import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Movement = Database["public"]["Tables"]["movements"]["Row"];
type MovementInsert = Database["public"]["Tables"]["movements"]["Insert"];

export type MovementWithProduct = Movement & {
  products: { name: string; model: string } | null;
};

export function useMovements() {
  const [movements, setMovements] = useState<MovementWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovements();

    const channel = supabase
      .channel("movements-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movements" },
        () => {
          fetchMovements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchMovements() {
    const { data, error } = await supabase
      .from("movements")
      .select("*, products(name, model)")
      .order("created_at", { ascending: false });
    if (!error && data) setMovements(data as MovementWithProduct[]);
    setLoading(false);
  }

  async function addMovement(movement: MovementInsert) {
    // If exit, update product quantity
    if (movement.type === "exit") {
      const { data: product } = await supabase
        .from("products")
        .select("quantity")
        .eq("id", movement.product_id)
        .single();
      if (!product) throw new Error("Producto no encontrado");
      if (product.quantity < movement.quantity) {
        throw new Error("Stock insuficiente");
      }
      const { error: updateError } = await supabase
        .from("products")
        .update({
          quantity: product.quantity - movement.quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", movement.product_id);
      if (updateError) throw updateError;
    } else {
      // entry: increase quantity
      const { data: product } = await supabase
        .from("products")
        .select("quantity")
        .eq("id", movement.product_id)
        .single();
      if (!product) throw new Error("Producto no encontrado");
      const { error: updateError } = await supabase
        .from("products")
        .update({
          quantity: product.quantity + movement.quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", movement.product_id);
      if (updateError) throw updateError;
    }

    const { error } = await supabase.from("movements").insert(movement);
    if (error) throw error;
  }

  return { movements, loading, addMovement, refetch: fetchMovements };
}