import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService } from "../services/authServices";
import Cookies from "js-cookie";

// Async thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginService({ email, password });
      return res; // full response (user + token)
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Load initial state from cookies
const userFromCookie = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;

const tokenFromCookie = Cookies.get("token") || null;

const initialState = {
  user: userFromCookie,
  token: tokenFromCookie,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;   // user data
        state.token = action.payload.token; // token
        // store in cookies
        Cookies.set("user", JSON.stringify(action.payload.user), { expires: 7, secure: true, sameSite: "strict" });
        Cookies.set("token", action.payload.token, { expires: 7, secure: true, sameSite: "strict" });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
