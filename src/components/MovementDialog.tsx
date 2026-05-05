import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Producto } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  products: Producto[];
  onSubmit: (data: any) => void;
}

export function MovementDialog({ open, onClose, products, onSubmit }: Props) {
  const [producto_id, setProducto] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "salida">("salida");
  const [cantidad, setCantidad] = useState(1);
  const [persona, setPersona] = useState("");
  const [area, setArea] = useState("");
  const [destination_location, setDestinationLocation] = useState("");

  function submit(e: any) {
    e.preventDefault();

    onSubmit({
      producto_id: Number(producto_id),
      tipo,
      cantidad,
      persona,
      area,
      destination_location,
    });

    setProducto("");
    setTipo("salida");
    setCantidad(1);
    setPersona("");
    setArea("");
    setDestinationLocation("");
    onClose();
  }

  const currentProduct = products.find((p) => p.id === Number(producto_id));
  const isOutOfStock = currentProduct && currentProduct.cantidad < cantidad;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tipo === "entrada" ? (
              <>
                <ArrowDownCircle className="h-5 w-5 text-green-600" />
                Ingreso de Producto
              </>
            ) : (
              <>
                <ArrowUpCircle className="h-5 w-5 text-orange-600" />
                Salida de Producto
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="flex gap-2 bg-muted p-2 rounded-lg">
            <Button
              type="button"
              variant={tipo === "entrada" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setTipo("entrada")}
            >
              <ArrowDownCircle className="h-4 w-4 mr-1" />
              Ingreso
            </Button>
            <Button
              type="button"
              variant={tipo === "salida" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setTipo("salida")}
            >
              <ArrowUpCircle className="h-4 w-4 mr-1" />
              Salida
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="producto">Producto *</Label>
            <Select value={producto_id} onValueChange={setProducto}>
              <SelectTrigger id="producto">
                <SelectValue placeholder="Seleccionar producto..." />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.nombre} (Stock: {p.cantidad})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cantidad">Cantidad *</Label>
            <Input
              id="cantidad"
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              required
            />
            {isOutOfStock && tipo === "salida" && (
              <p className="text-xs text-destructive">Stock insuficiente</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="persona">Persona *</Label>
            <Input
              id="persona"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              placeholder="Nombre de quien realiza"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Área</Label>
            <Input
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ej: Zona A, Depósito, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación Destino</Label>
            <Input
              id="location"
              value={destination_location}
              onChange={(e) => setDestinationLocation(e.target.value)}
              placeholder="Ej: Estante B4, Piso 2, etc."
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isOutOfStock}>
              Guardar Movimiento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}