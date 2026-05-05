import { useState, useEffect } from "react";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "@/services/api";

import { Producto } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProductos();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(product: Producto) {
    try {
      await crearProducto(product);
      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProduct(id: number, updates: Partial<Producto>) {
    try {
      await actualizarProducto(id, updates);
      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProduct(id: number) {
    try {
      await eliminarProducto(id);
      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}