import { create } from 'zustand';
import { CartItem, MenuItem } from '../types/index';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => {
  // Private function to calculate the total
  const updateTotal = () => {
    const total = get().items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
    set({ total });
  };

  return {
    items: [],
    total: 0,

    addItem: (menuItem) => {
      const currentItems = get().items;
      const existingItem = currentItems.find(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItem) {
        const updatedItems = currentItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ items: updatedItems });
      } else {
        set({ items: [...currentItems, { menuItem, quantity: 1 }] });
      }

      updateTotal(); // Call the private function
    },

    removeItem: (itemId) => {
      set((state) => ({
        items: state.items.filter((item) => item.menuItem.id !== itemId),
      }));
      updateTotal(); // Call the private function
    },

    updateQuantity: (itemId, quantity) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.menuItem.id === itemId ? { ...item, quantity } : item
        ),
      }));
      updateTotal(); // Call the private function
    },

    clearCart: () => {
      set({ items: [], total: 0 });
    },
  };
});
