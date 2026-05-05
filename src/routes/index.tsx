import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Package, ArrowDownCircle, ArrowUpCircle, Plus, Moon, Sun } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/StatsCards";
import { CategoriesView } from "@/components/CategoriesView";
import { MovementsHistory } from "@/components/MovementsHistory";
import { ProductDialog } from "@/components/ProductDialog";
import { MovementDialog } from "@/components/MovementDialog";
import { useProducts } from "@/hooks/use-products";
import { useMovements } from "@/hooks/use-movements";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pañol de Bodega — Gestión de Inventario" },
      { name: "description", content: "Sistema de control de inventario para pañol. Registro de entradas, salidas y seguimiento en tiempo real." },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, loading: loadingProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const { movements, loading: loadingMovements, addMovement } = useMovements();
  const { theme, toggleTheme } = useTheme();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showMovement, setShowMovement] = useState(false);
  const [movementType, setMovementType] = useState<"entry" | "exit">("exit");

  const isLoading = loadingProducts || loadingMovements;

  function openMovement(type: "entry" | "exit") {
    setMovementType(type);
    setShowMovement(true);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">Pañol</h1>
              <p className="text-xs text-muted-foreground leading-none">Control de inventario</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="success"
              size="default"
              onClick={() => openMovement("entry")}
              className="hidden sm:inline-flex"
            >
              <ArrowDownCircle className="h-4 w-4" />
              Ingreso
            </Button>
            <Button
              variant="warning"
              size="default"
              onClick={() => openMovement("exit")}
              className="hidden sm:inline-flex"
            >
              <ArrowUpCircle className="h-4 w-4" />
              Salida
            </Button>
            <Button
              variant="success"
              size="icon"
              onClick={() => openMovement("entry")}
              className="sm:hidden"
            >
              <ArrowDownCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="warning"
              size="icon"
              onClick={() => openMovement("exit")}
              className="sm:hidden"
            >
              <ArrowUpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <StatsCards products={products} />

            <Tabs defaultValue="products">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="products">Productos</TabsTrigger>
                  <TabsTrigger value="movements">Movimientos</TabsTrigger>
                </TabsList>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddProduct(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Producto</span>
                </Button>
              </div>

              <TabsContent value="products">
                <CategoriesView
                  products={products}
                  onUpdate={updateProduct}
                  onDelete={deleteProduct}
                />
              </TabsContent>

              <TabsContent value="movements">
                <MovementsHistory movements={movements} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Dialogs */}
      <ProductDialog
        open={showAddProduct}
        onOpenChange={setShowAddProduct}
        onSubmit={addProduct}
      />
      <MovementDialog
        open={showMovement}
        onClose={() => setShowMovement(false)}
        products={products}
        onSubmit={async (data) => {
          try {
            await addMovement(data);
          } catch (err) {
            alert(err instanceof Error ? err.message : "Error al registrar movimiento");
          }
        }}
      />
    </div>
  );
}
