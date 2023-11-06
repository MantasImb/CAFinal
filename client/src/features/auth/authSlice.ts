import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

type AdministratorType = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  isOwner: boolean;
  isApproved: boolean;
  token: string;
};

// Get user from localStorage
const user: AdministratorType = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const initialState = {
  user: Object.keys(user).length > 0 ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (
    user: {
      email: string;
      name: string;
      surname: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (
    user: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Registration successfull";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Logged in successfully";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
