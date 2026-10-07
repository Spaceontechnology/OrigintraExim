import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowUpRight, ArrowRight, MapPin, Sparkles, Layers, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS as DEFAULT_PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { Product } from '../types';
import { AdminStorage } from '../services/adminStorage';

interface ProductsPageProps {
  onOpenProductDetail: (product: Product) => void;
  onOpenQuoteWithProduct: (productName: string) => void;
  onNavigate: (page: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenProductDetail,
  onOpenQuoteWithProduct,
  onNavigate
}) => {
  const [products, setProducts] = useState<Product[]>(() => AdminStorage.getProducts());
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');
  const [selectedFormFilter, setSelectedFormFilter] = useState<'All' | 'Whole' | 'Powder'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(AdminStorage.getProducts());
    };
    window.addEventListener('origintra_products_updated', handleUpdate);
    return () => window.removeEventListener('origintra_products_updated', handleUpdate);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.categoryKey] = (counts[p.categoryKey] || 0) + 1;
    });
    return counts;
  }, [products]);

  const currentCategory = useMemo(() => {
    return PRODUCT_CATEGORIES.find(c => c.key === selectedCategoryKey) || PRODUCT_CATEGORIES[0];
  }, [selectedCategoryKey]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      const matchesCategory = selectedCategoryKey === 'all' || product.categoryKey === selectedCategoryKey;
      
      // Form filter
      const isPowderOrBlend = 
        product.categoryKey === 'ground-spices' || 
        product.categoryKey === 'blends' || 
        (product.availableForms || []).some(f => f.toLowerCase().includes('powder') || f.toLowerCase().includes('ground') || f.toLowerCase().includes('masala'));
      
      const isWholeOrSeed = 
        product.categoryKey === 'whole-spices' || 
        product.categoryKey === 'seeds' || 
        (product.availableForms || []).some(f => f.toLowerCase().includes('whole') || f.toLowerCase().includes('seeds') || f.toLowerCase().includes('pod'));

      const matchesForm = 
        selectedFormFilter === 'All' ||
        (selectedFormFilter === 'Powder' && isPowderOrBlend) ||
        (selectedFormFilter === 'Whole' && isWholeOrSeed);

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        product.name.toLowerCase().includes(q) ||
        (product.botanicalName && product.botanicalName.toLowerCase().includes(q)) ||
        (product.tagline && product.tagline.toLowerCase().includes(q)) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        (product.grade && product.grade.toLowerCase().includes(q));

      return matchesCategory && matchesForm && matchesSearch;
    });
  }, [products, selectedCategoryKey, selectedFormFilter, searchQuery]);

  return (
    <div className="bg-white text-[#0F172A] min-h-[70vh]">
      
      {/* 1. Page Hero */}
      <section className="bg-[#0A1C3E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0070E0_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="container-x mx-auto max-w-[1440px] relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-[#38BDF8] text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Complete Export Portfolio • {products.length} Indian Spice Varieties</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-white">
              Export Spices, Seeds & Masala Blends<span className="text-[#38BDF8]">.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-1">
              Directly sourced from contracted regional farms across India. Available in whole harvest grades, sortex-cleaned seeds, and mill-controlled powders for international food manufacturers, spice grinders, and distributors.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter and Search Bar (Sticky) */}
      <section className="border-b border-slate-200 bg-white/95 sticky top-20 z-20 backdrop-blur-md py-4 shadow-2xs">
        <div className="container-x mx-auto max-w-[1440px] space-y-3.5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategoryKey(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
                    selectedCategoryKey === cat.key
                      ? 'bg-[#0070E0] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    selectedCategoryKey === cat.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {categoryCounts[cat.key] ?? 0}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by spice name, origin, grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#0070E0] focus:ring-1 focus:ring-[#0070E0] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ×
                </button>
              )}
            </div>

          </div>

          {/* Sub-Filters: Form Filter + Results Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <span className="hidden sm:inline">Form Filter:</span>
              <button
                onClick={() => setSelectedFormFilter('All')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  selectedFormFilter === 'All' ? 'bg-[#0A1C3E] text-white font-semibold' : 'hover:text-slate-900'
                }`}
              >
                All Forms
              </button>
              <span>•</span>
              <button
                onClick={() => setSelectedFormFilter('Whole')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  selectedFormFilter === 'Whole' ? 'bg-[#0A1C3E] text-white font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Whole Spices & Seeds
              </button>
              <span>•</span>
              <button
                onClick={() => setSelectedFormFilter('Powder')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  selectedFormFilter === 'Powder' ? 'bg-[#0A1C3E] text-white font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Ground Powders & Blends
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> of {products.length} products
            </div>
          </div>

        </div>
      </section>

      {/* 3. Category Description Intro Banner (When specific category selected) */}
      {selectedCategoryKey !== 'all' && (
        <section className="bg-slate-50 border-b border-slate-200 py-6">
          <div className="container-x mx-auto max-w-[1440px]">
            <div className="max-w-4xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
                Category Profile
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#0F172A]">
                {currentCategory.label}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Products Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-x mx-auto max-w-[1440px]">
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-slate-500 space-y-3">
              <p className="text-lg font-medium">No export products match your selected criteria.</p>
              <button
                onClick={() => { setSelectedCategoryKey('all'); setSelectedFormFilter('All'); setSearchQuery(''); }}
                className="text-xs font-semibold text-[#0070E0] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Origin Badge */}
                      <div className="absolute top-3 left-3 bg-[#0A1C3E]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center space-x-1 shadow-sm">
                        <MapPin className="w-3 h-3 text-[#38BDF8]" />
                        <span>{product.origin.split('—')[0].split(',')[0]}</span>
                      </div>

                      {/* Flagship Badge */}
                      {product.isFlagship && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                          Flagship
                        </div>
                      )}

                      {/* Category Tag on bottom left */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#0A1C3E] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        {product.category}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-3.5">
                      <div>
                        <a
                          href={`/products/${product.slug}`}
                          onClick={(e) => {
                            if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                              e.preventDefault();
                              onOpenProductDetail(product);
                            }
                          }}
                          className="hover:underline"
                        >
                          <h3 className="text-xl font-display font-bold text-[#0F172A] group-hover:text-[#0070E0] transition-colors leading-snug">
                            {product.name}
                          </h3>
                        </a>
                        {product.botanicalName && (
                          <p className="text-xs text-slate-500 italic mt-0.5 font-serif">
                            {product.botanicalName}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {product.tagline || product.shortDescription}
                      </p>

                      {/* Key Grade / Specification Snippet */}
                      {product.grade && (
                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            Grades / Specs:
                          </span>
                          <span className="inline-block text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {product.grade.split('·').slice(0, 2).join(' · ')}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between gap-3">
                    <a
                      href={`/products/${product.slug}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                          e.preventDefault();
                          onOpenProductDetail(product);
                        }
                      }}
                      className="text-xs font-semibold text-slate-700 hover:text-[#0070E0] flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onOpenQuoteWithProduct(product.name)}
                      className="px-4 py-2 rounded-full bg-[#0A1C3E] hover:bg-[#0070E0] text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-1 shadow-2xs"
                    >
                      <span>Enquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 5. Custom Blending & Sourcing Banner */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container-x mx-auto max-w-[1440px] text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
            Bespoke Export Supply
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#0F172A]">
            Require a custom granulation, mixed container load, or private label packing?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            We support international food brands, seasonings manufacturers, and distributors with customized mesh grinding, steam sterilization, and mixed 20ft/40ft container consignments.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuoteWithProduct('Custom Spice Sourcing & Blending')}
              className="btn-pill btn-pill-dark bg-[#0070E0] hover:bg-[#005bb5] text-white px-7 py-3 text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Consult Our Commercial Export Desk</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
