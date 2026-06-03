"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Plus, Trash2, Box, Layers } from "lucide-react";
import { addProductAction, deleteProductAction } from "../actions";

export function ClientProductsManager({ initialEcosystem }: { initialEcosystem: any[] }) {
  const [ecosystem, setEcosystem] = useState(initialEcosystem);
  const [activeSuite, setActiveSuite] = useState(ecosystem[0]?.slug);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const newProduct = {
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get("description") as string,
      nameAr: formData.get("nameAr") as string,
      descAr: formData.get("descAr") as string,
    };

    await addProductAction(activeSuite, newProduct);
    
    // Optimistic UI update
    const updatedEcosystem = ecosystem.map(s => {
      if (s.slug === activeSuite) {
        return { ...s, products: [...s.products, newProduct] };
      }
      return s;
    });
    setEcosystem(updatedEcosystem);
    
    setAdding(false);
    setLoading(false);
  }

  async function handleDelete(suiteSlug: string, productSlug: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProductAction(suiteSlug, productSlug);
    
    // Optimistic update
    const updatedEcosystem = ecosystem.map(s => {
      if (s.slug === suiteSlug) {
        return { ...s, products: s.products.filter((p: any) => p.slug !== productSlug) };
      }
      return s;
    });
    setEcosystem(updatedEcosystem);
  }

  const currentSuiteData = ecosystem.find(s => s.slug === activeSuite);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Suites List */}
      <div className="lg:col-span-1 space-y-2">
        <h2 className="text-sm font-bold text-slate uppercase tracking-wider mb-4 px-2">Suites</h2>
        {ecosystem.map((suite) => (
          <button
            key={suite.slug}
            onClick={() => { setActiveSuite(suite.slug); setAdding(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left ${
              activeSuite === suite.slug 
                ? "bg-amethyst/10 border border-amethyst/30 text-platinum font-bold" 
                : "bg-obsidian border border-fg/5 text-slate hover:bg-fg/5 hover:text-platinum"
            }`}
          >
            <Layers className={`w-5 h-5 ${activeSuite === suite.slug ? "text-amethyst" : "text-slate/50"}`} />
            <span>{suite.suite}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-platinum">{currentSuiteData?.suite}</h2>
            <p className="text-slate text-sm">{currentSuiteData?.description}</p>
          </div>
          <button 
            onClick={() => setAdding(!adding)}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan/10 text-cyan border border-cyan/20 rounded-lg hover:bg-cyan hover:text-void font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        {adding && (
          <Card className="p-6 mb-8 border-cyan/30 bg-obsidian">
            <h3 className="text-lg font-bold text-platinum mb-4 border-b border-fg/10 pb-2">Add New Product to {currentSuiteData?.suite}</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate uppercase">Name (EN)</label>
                  <input name="name" required className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate uppercase">Name (AR)</label>
                  <input name="nameAr" required className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate uppercase">Description (EN)</label>
                <textarea name="description" required rows={2} className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate uppercase">Description (AR)</label>
                <textarea name="descAr" required rows={2} className="w-full px-4 py-2 bg-void border border-fg/10 rounded-lg text-platinum focus:border-cyan outline-none resize-none text-right font-arabic" dir="rtl" />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-slate hover:bg-fg/5">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-cyan text-void font-bold rounded-lg hover:bg-cyan/90 disabled:opacity-50">
                  {loading ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSuiteData?.products.map((product: any) => (
            <Card key={product.slug} className="p-5 border-fg/10 bg-obsidian group">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-platinum text-lg flex items-center">
                    <Box className="w-4 h-4 text-cyan mr-2" />
                    {product.name}
                  </h4>
                  <h5 className="font-arabic text-slate/80 text-sm mt-1" dir="rtl">{product.nameAr}</h5>
                </div>
                <button 
                  onClick={() => handleDelete(activeSuite, product.slug)}
                  className="p-2 rounded-md text-slate hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
