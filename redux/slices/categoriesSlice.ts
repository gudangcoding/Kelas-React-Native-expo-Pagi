import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '@/lib/api';

type CategoriesState = {
  items: any[];
  loading: boolean;
  error: string | null;
};

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategoriesThunk = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
  try {
    // Assuming /v1/categories exists per api_doc
    const res = await api.apiFetch('/v1/categories');
    return res?.data ?? [];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? 'Gagal mengambil kategori');
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Gagal mengambil kategori';
      });
  },
});

export default categoriesSlice.reducer;