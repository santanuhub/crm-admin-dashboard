import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ThemeMode = "light" | "dark" | "system";

interface UiState {
  sidebarCollapsed: boolean;
  theme: ThemeMode;
}

interface AuthState {
  isAuthenticated: boolean;
}

const initialUiState: UiState = {
  sidebarCollapsed: false,
  theme: "system",
};

const initialAuthState: AuthState = {
  isAuthenticated: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.theme = action.payload;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthenticated: (state, action: { payload: boolean }) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export const { setAuthenticated } = authSlice.actions;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["Lead", "Contact", "Company", "Deal", "Task"],
  endpoints: () => ({}),
});

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
