import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '@/lib/api';

type ProductState = {
  items: any[];
  searchResults: any[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  items: [],
  searchResults: [],
  loading: false,
  error: null,
};

export const fetchProductsThunk = createAsyncThunk('product/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.getProducts();
    return res?.data ?? [];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? 'Gagal mengambil produk');
  }
});

export const searchProductsThunk = createAsyncThunk(
  'product/search',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const res = await api.searchProducts(keyword);
      return res?.data ?? [];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Pencarian produk gagal');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Gagal mengambil produk';
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Pencarian produk gagal';
      });
  },
});

export default productSlice.reducer;