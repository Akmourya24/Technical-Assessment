import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  usersCache: {}, // Stores list results: { 'q=john&skip=0&limit=10': { users: [...], total: 100 } }
  userDetailCache: {}, // Stores individual details: { '1': { ...userObj } }
  loading: false,
  error: null,

  // --- Action: Fetch Users with Caching ---
  fetchUsers: async ({ page, rowsPerPage, searchQuery }) => {
    const skip = page * rowsPerPage;
    
    // 1. Create a unique key for this specific data request
    const cacheKey = `q=${searchQuery}&skip=${skip}&limit=${rowsPerPage}`;
    
    // 2. Check Cache: If data exists, return it immediately (Performance Win)
    const cachedData = get().usersCache[cacheKey];
    if (cachedData) {
      return cachedData;
    }

    set({ loading: true, error: null });
    try {
      const baseUrl = 'https://dummyjson.com/users';
      const url = searchQuery 
        ? `${baseUrl}/search?q=${searchQuery}&limit=${rowsPerPage}&skip=${skip}`
        : `${baseUrl}?limit=${rowsPerPage}&skip=${skip}`;

      const response = await fetch(url);
      const data = await response.json();

      // 3. Update Cache: Store the new result with the key
      set((state) => ({
        loading: false,
        usersCache: { ...state.usersCache, [cacheKey]: data }
      }));
      
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // --- Action: Fetch Single User Detail with Caching ---
  fetchUserDetails: async (id) => {
    // Check Cache first
    const cachedUser = get().userDetailCache[id];
    if (cachedUser) return cachedUser;

    set({ loading: true });
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await response.json();

      set((state) => ({
        loading: false,
        userDetailCache: { ...state.userDetailCache, [id]: data }
      }));
      return data;
    } catch (error) {
      console.error(error);
      set({ loading: false });
      return null;
    }
  }
}));