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

type Product = Database["public"]["Tables"]["products"]["Row"];
type MovementType = Database["public"]["Enums"]["movement_type"];

interface MovementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  defaultType?: MovementType;
  onSubmit: (data: {
    product_id: string;
    type: MovementType;
    quantity: number;
    person_name: string;
    area: string;
    destination_location: string;
    notes: string;
  }) => void;
}

export function MovementDialog({
  open,
  onOpenChange,
  products,
  defaultType = "exit",
  onSubmit,
}: MovementDialogProps) {
  const [productId, setProductId] = useState("");
  const [type, setType] = useState<MovementType>(defaultType);
  const [quantity, setQuantity] = useState(1);
  const [personName, setPersonName] = useState("");
  const [area, setArea] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [notes, setNotes] = useState("");

  const selectedProduct = products.find((p) => p.id === productId);
  const maxQty = type === "exit" ? (selectedProduct?.quantity ?? 0) : 9999;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!productId || quantity < 1) return;
    onSubmit({
      product_id: productId,
      type,
      quantity,
      person_name: personName.trim(),
      area: area.trim(),
      destination_location: destinationLocation.trim(),
      notes: notes.trim(),
    });
    setProductId("");
    setQuantity(1);
    setPersonName("");
    setArea("");
    setDestinationLocation("");
    setNotes("");
    onOpenChange(false);
  }

  const isEntry = type === "entry";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEntry ? "📥 Registrar ingreso" : "📤 Registrar salida"}
          </DialogTitle>
          <DialogDescription>
            {isEntry ? "Devolución o reposición de producto" : "Retiro de producto del pañol"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              size="lg"
              variant={type === "exit" ? "warning" : "outline"}
              className="flex-1"
              onClick={() => setType("exit")}
            >
              Salida
            </Button>
            <Button
              type="button"
              size="lg"
              variant={type === "entry" ? "success" : "outline"}
              className="flex-1"
              onClick={() => setType("entry")}
            >
              Ingreso
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Producto *</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar producto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} {p.model ? `(${p.model})` : ""} — Stock: {p.quantity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mv-qty">Cantidad *</Label>
            <Input
              id="mv-qty"
              type="number"
              min={1}
              max={maxQty}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
            {type === "exit" && selectedProduct && (
              <p className="text-xs text-muted-foreground">
                Disponible: {selectedProduct.quantity}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mv-person">Persona {type === "exit" ? "*" : ""}</Label>
            <Input
              id="mv-person"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Nombre de quien retira/devuelve"
              required={type === "exit"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mv-area">Área</Label>
            <Input
              id="mv-area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ej: Mantenimiento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mv-location">Ubicación destino</Label>
            <Input
              id="mv-location"
              value={destinationLocation}
              onChange={(e) => setDestinationLocation(e.target.value)}
              placeholder="Ej: Piso 2, Estante A"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={isEntry ? "success" : "warning"}
              size="lg"
            >
              {isEntry ? "Registrar ingreso" : "Registrar salida"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}