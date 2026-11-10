import { create } from 'zustand';

const STORAGE_KEY = 'cart_items';

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: loadInitialItems(),

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  setQuantity: (id, quantity) => {
    if (quantity < 1) {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clear: () => set({ items: [] }),
}));

// Sync cart state with localStorage outside React
useCartStore.subscribe((state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch (err) {
    console.error('Failed to persist cart items', err);
  }
});