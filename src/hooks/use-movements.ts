import { useState, useEffect } from "react";
import { getMovimientos, crearMovimiento } from "@/services/api";
import { Movimiento } from "@/types";

export function useMovements() {
  const [movements, setMovements] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovements();
  }, []);

  async function fetchMovements() {
    try {
      setLoading(true);
      const data = await getMovimientos();
      setMovements(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addMovement(movement: any) {
    try {
      await crearMovimiento(movement);
      await fetchMovements();
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  }

  return {
    movements,
    loading,
    error,
    addMovement,
    refetch: fetchMovements,
  };
}