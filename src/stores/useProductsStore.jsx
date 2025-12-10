import { create } from 'zustand';

export const useProductsStore = create((set, get) => ({
  // --- Cache Storage ---
  // Key format: "q=...&cat=...&skip=...&limit=..."
  // Why: Allows us to instantly restore the UI when a user returns to a specific page/filter combo.
  productsCache: {}, 
  
  // Key format: "productId"
  // Why: Prevents re-fetching a product if we visited it recently.
  productDetailCache: {}, 
  
  categories: [],
  loading: false,
  error: null,

  // --- Actions ---

  // 1. Fetch Categories (Cached)
  fetchCategories: async () => {
    const { categories } = get();
    // Return immediately if already loaded
    if (categories.length > 0) return categories;

    set({ loading: true, error: null });
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      // Normalize data (handle if API returns objects or strings)
      const categoryList = data.map(c => typeof c === 'object' ? c.slug : c);
      
      set({ categories: categoryList, loading: false });
      return categoryList;
    } catch (err) {
      set({ error: err.message, loading: false });
      return [];
    }
  },

  // 2. Fetch Products List (Cached)
  fetchProducts: async ({ limit = 8, skip = 0, q = '', category = '' } = {}) => {
    // Generate unique Cache Key
    const cacheKey = `q=${q}&cat=${category}&skip=${skip}&limit=${limit}`;
    
    // Check Cache
    const cachedData = get().productsCache[cacheKey];
    if (cachedData) {
      return cachedData; // Return cached result immediately
    }

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

      const res = await fetch(url);
      const data = await res.json();
      
      // Update Cache
      set((state) => ({ 
        productsCache: { ...state.productsCache, [cacheKey]: data }, 
        loading: false 
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // 3. Fetch Single Product (Cached)
  fetchProductById: async (id) => {
    if (!id) return null;
    
    // Check Cache
    const cachedProduct = get().productDetailCache[id];
    if (cachedProduct) return cachedProduct;

    set({ loading: true, error: null });
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      
      // Update Cache
      set((state) => ({ 
        productDetailCache: { ...state.productDetailCache, [id]: data }, 
        loading: false 
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  }
}));