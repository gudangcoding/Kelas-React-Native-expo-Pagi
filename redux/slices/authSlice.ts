import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '@/lib/api';

type AuthState = {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.login({ email: payload.email, password: payload.password });
      if (res.ok && (res as any).data?.token) {
        api.TokenStorage.setToken((res as any).data.token);
      }
      return (res as any).data ?? res;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Login gagal');
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; password: string; password_confirmation?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.register({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        c_password: payload.password_confirmation ?? payload.password,
      } as any);
      if (res.ok && (res as any).data?.token) {
        api.TokenStorage.setToken((res as any).data.token);
      }
      return (res as any).data ?? res;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Registrasi gagal');
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Best-effort server logout; ignore errors
    try {
      await api.logout();
    } catch {}
    api.TokenStorage.clear();
    return true;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? 'Logout gagal');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      const token = api.TokenStorage.getToken();
      if (token) state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload?.token ?? state.token;
        state.user = action.payload?.user ?? null;
      })
      .addCase(loginThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Login gagal';
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload?.token ?? state.token;
        state.user = action.payload?.user ?? null;
      })
      .addCase(registerThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload ?? 'Registrasi gagal';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;