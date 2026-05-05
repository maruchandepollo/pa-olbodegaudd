import { useState } from "react";
import { Categoria } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function ProductDialog({ open, onOpenChange, onSubmit }: Props) {
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState<Categoria>("varios");

  function submit(e: any) {
    e.preventDefault();
    if (!nombre.trim()) return;

    onSubmit({
      nombre: nombre.trim(),
      modelo: modelo.trim(),
      cantidad,
      categoria,
    });

    setNombre("");
    setModelo("");
    setCantidad(0);
    setCategoria("varios");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Producto *</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Taladro"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            <Input
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Ej: Bosch GSB 550"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select value={categoria} onValueChange={(v) => setCategoria(v as Categoria)}>
                <SelectTrigger id="categoria">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clima">❄️ Clima</SelectItem>
                  <SelectItem value="herramientas">🔧 Herramientas</SelectItem>
                  <SelectItem value="varios">📦 Varios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad Inicial</Label>
              <Input
                id="cantidad"
                type="number"
                min="0"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Crear Producto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}