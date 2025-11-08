import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  variant?: string | null;
  size?: string | null;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

function sameKey(a: CartItem, b: CartItem) {
  return (
    String(a.id) === String(b.id) &&
    (a.variant ?? null) === (b.variant ?? null) &&
    (a.size ?? null) === (b.size ?? null)
  );
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const incoming = action.payload;
      const existing = state.items.find((i) => sameKey(i, incoming));
      if (existing) {
        existing.qty += incoming.qty;
      } else {
        state.items.push({ ...incoming, qty: Math.max(1, incoming.qty) });
      }
    },
    increment(state, action: PayloadAction<{ id: string | number; variant?: string | null; size?: string | null }>) {
      const { id, variant = null, size = null } = action.payload;
      const item = state.items.find((i) => String(i.id) === String(id) && (i.variant ?? null) === variant && (i.size ?? null) === size);
      if (item) item.qty += 1;
    },
    decrement(state, action: PayloadAction<{ id: string | number; variant?: string | null; size?: string | null }>) {
      const { id, variant = null, size = null } = action.payload;
      const item = state.items.find((i) => String(i.id) === String(id) && (i.variant ?? null) === variant && (i.size ?? null) === size);
      if (item) item.qty = Math.max(0, item.qty - 1);
    },
    removeItem(state, action: PayloadAction<{ id: string | number; variant?: string | null; size?: string | null }>) {
      const { id, variant = null, size = null } = action.payload;
      state.items = state.items.filter((i) => !(String(i.id) === String(id) && (i.variant ?? null) === variant && (i.size ?? null) === size));
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const { addItem, increment, decrement, removeItem, clear } = cartSlice.actions;
export default cartSlice.reducer;