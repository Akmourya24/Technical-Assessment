import { create } from 'zustand';

export const useProductsStore = create((set, get) => ({
  productsCache: {}, // cache keys: `list|limit=...|skip=...|q=...|cat=...`
  categories: [],
  productDetails: {}, // cache individual product by id
  loading: false,
  error: null,

  // Fetch categories once
  fetchCategories: async (signal) => {
    const { categories } = get();
    if (categories.length > 0) return categories;

    set({ loading: true, error: null });
    try {
      const res = await fetch('https://dummyjson.com/products/categories', { signal });
      const data = await res.json();
      // DummyJSON sometimes returns objects or strings depending on version, 
      // ensuring we handle simple array of strings or objects.
      const categoryList = data.map(c => typeof c === 'object' ? c.slug : c);
      set({ categories: categoryList, loading: false });
      return categoryList;
    } catch (err) {
      if (err.name === 'AbortError') {
        // request was aborted, keep previous state
        return [];
      }
      set({ error: err.message, loading: false });
      return [];
    }
  },

  // Fetch product list with caching
  fetchProducts: async ({ limit = 10, skip = 0, q = '', category = '' } = {}, signal) => {
    const key = `list|limit=${limit}&skip=${skip}|cat=${category}|q=${q}`;
    const cache = get().productsCache[key];
    if (cache) return cache;

    set({ loading: true, error: null });
    try {
      let url = `https://dummyjson.com/products`;
      
      if (q) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const res = await fetch(url, { signal });
      const data = await res.json();
      
      set((state) => ({ 
        productsCache: { ...state.productsCache, [key]: data }, 
        loading: false 
      }));
      return data;
    } catch (err) {
      if (err.name === 'AbortError') {
        // request aborted - do not update error state
        return null;
      }
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // Fetch single product by id with caching
  fetchProductById: async (id, signal) => {
    if (!id) return null;
    const cached = get().productDetails[id];
    if (cached) return cached;

    set({ loading: true, error: null });
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, { signal });
      const data = await res.json();
      set((state) => ({ 
        productDetails: { ...state.productDetails, [id]: data }, 
        loading: false 
      }));
      return data;
    } catch (err) {
      if (err.name === 'AbortError') {
        return null;
      }
      set({ error: err.message, loading: false });
      return null;
    }
  }
}));