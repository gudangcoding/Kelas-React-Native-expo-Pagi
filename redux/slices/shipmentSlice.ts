import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '@/lib/api';

type ShipmentState = {
  couriers: any[];
  provinces: any[];
  cities: any[];
  districts: any[];
  ongkir: any | null;
  tracking: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: ShipmentState = {
  couriers: [],
  provinces: [],
  cities: [],
  districts: [],
  ongkir: null,
  tracking: null,
  loading: false,
  error: null,
};

export const fetchCouriersThunk = createAsyncThunk('shipment/couriers', async (_, { rejectWithValue }) => {
  try {
    const res = await api.apiFetch('/v1/shipping/couriers');
    return res?.data ?? [];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? 'Gagal mengambil kurir');
  }
});

export const fetchProvincesThunk = createAsyncThunk('shipment/provinces', async (_, { rejectWithValue }) => {
  try {
    const res = await api.apiFetch('/v1/shipping/provinces');
    return res?.data ?? [];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? 'Gagal mengambil provinsi');
  }
});

export const fetchCitiesThunk = createAsyncThunk(
  'shipment/cities',
  async (provinceId: string, { rejectWithValue }) => {
    try {
      const res = await api.apiFetch(`/v1/shipping/cities?province_id=${provinceId}`);
      return res?.data ?? [];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Gagal mengambil kota');
    }
  }
);

export const fetchDistrictsThunk = createAsyncThunk(
  'shipment/districts',
  async (cityId: string, { rejectWithValue }) => {
    try {
      const res = await api.apiFetch(`/v1/shipping/districts?city_id=${cityId}`);
      return res?.data ?? [];
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Gagal mengambil kecamatan');
    }
  }
);

export const checkOngkirThunk = createAsyncThunk(
  'shipment/ongkir',
  async (
    payload: { courier: string; origin: string; destination: string; weight: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.apiFetch('/v1/shipping/check-ongkir', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res?.data ?? res;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Gagal cek ongkir');
    }
  }
);

export const trackShipmentThunk = createAsyncThunk(
  'shipment/track',
  async (payload: { courier: string; tracking_number: string }, { rejectWithValue }) => {
    try {
      const res = await api.apiFetch('/v1/shipping/track', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res?.data ?? res;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Gagal melacak pengiriman');
    }
  }
);

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouriersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouriersThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.couriers = action.payload;
      })
      .addCase(fetchCouriersThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Gagal mengambil kurir';
      })
      .addCase(fetchProvincesThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.provinces = action.payload;
      })
      .addCase(fetchCitiesThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.cities = action.payload;
      })
      .addCase(fetchDistrictsThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.districts = action.payload;
      })
      .addCase(checkOngkirThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.ongkir = action.payload;
      })
      .addCase(trackShipmentThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.tracking = action.payload;
      });
  },
});

export default shipmentSlice.reducer;