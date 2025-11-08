import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '@/lib/api';

type OrderState = {
  lastOrder: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  lastOrder: null,
  loading: false,
  error: null,
};

export const createOrderThunk = createAsyncThunk(
  'order/create',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await api.apiFetch('/v1/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res?.data ?? res;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Gagal membuat pesanan');
    }
  }
);

export const refundOrderThunk = createAsyncThunk(
  'order/refund',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await api.apiFetch(`/v1/orders/${orderId}/refund`, { method: 'POST' });
      return res?.data ?? res;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Gagal refund pesanan');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Gagal membuat pesanan';
      })
      .addCase(refundOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refundOrderThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refundOrderThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Gagal refund pesanan';
      });
  },
});

export default orderSlice.reducer;