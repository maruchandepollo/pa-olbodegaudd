import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type Category = Database["public"]["Enums"]["product_category"];

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    model: string;
    quantity: number;
    category: Category;
    location: string;
  }) => void;
  initial?: {
    name: string;
    model: string;
    quantity: number;
    category?: Category;
    location?: string;
  };
  title?: string;
}

export function ProductDialog({
  open,
  onOpenChange,
  onSubmit,
  initial,
  title = "Agregar producto",
}: ProductDialogProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [model, setModel] = useState(initial?.model ?? "");
  const [quantity, setQuantity] = useState(initial?.quantity ?? 0);
  const [category, setCategory] = useState<Category>(initial?.category ?? "varios");
  const [location, setLocation] = useState(initial?.location ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      model: model.trim(),
      quantity,
      category,
      location: location.trim(),
    });
    if (!initial) {
      setName("");
      setModel("");
      setQuantity(0);
      setCategory("varios");
      setLocation("");
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Completá los datos del producto</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prod-name">Nombre *</Label>
            <Input
              id="prod-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Taladro"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prod-model">Modelo</Label>
            <Input
              id="prod-model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Ej: Bosch GSB 550"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prod-category">Categoría *</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger id="prod-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clima">Clima</SelectItem>
                <SelectItem value="herramientas">Herramientas</SelectItem>
                <SelectItem value="varios">Varios</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prod-location">Ubicación física</Label>
            <Input
              id="prod-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Piso 2, Estante A"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prod-qty">Cantidad inicial</Label>
            <Input
              id="prod-qty"
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{initial ? "Guardar" : "Agregar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}