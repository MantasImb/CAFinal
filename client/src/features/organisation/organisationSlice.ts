import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organisationService from "./organisationService";
import { RootState } from "../../app/store";

export type ReservationType = {
  _id: string;
  timestamp: number;
  name: string;
  surname: string;
  email: string;
};

// Must mirror the backend schema
type OrganisationType = {
  _id: string;
  organisationName: string;
  reservations: ReservationType[];
  administrators: object[];
  owner: object;
};

const initialState = {
  organisation: null as OrganisationType | null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register organisation
type RegisterOrganisationType = {
  organisationName: string;
};

export const registerOrganisation = createAsyncThunk<
  // data return type
  OrganisationType,
  // payload type
  RegisterOrganisationType,
  // thunkAPI type
  { state: RootState; rejectValue: string }
>("organisation/register", async (organisation, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) throw new Error("User not logged in");

    return await organisationService.register(organisation, user.token);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

// Get organisation that user is owner of
export const getOwnerOrganisation = createAsyncThunk<
  // data return type
  OrganisationType,
  // payload type
  undefined,
  // thunkAPI type
  { state: RootState; rejectValue: string }
>("organisation/getOwnerOrganisation", async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) throw new Error("User not logged in");

    return await organisationService.getOwnerOrganisation(user.token);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

// TODO: Request to join an organisation

// Register a new reservation
export const createReservation = createAsyncThunk<
  // data return type
  ReservationType,
  // payload type
  Omit<ReservationType, "_id">,
  // thunkAPI type
  { state: RootState; rejectValue: string }
>("organisation/createReservation", async (reservation, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) throw new Error("User not logged in");

    const organisation = thunkAPI.getState().organisation.organisation;
    if (!organisation) throw new Error("Organisation not found");

    return await organisationService.registerReservation(
      organisation._id,
      reservation,
      user.token
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

// Update a reservation date
export const updateReservation = createAsyncThunk<
  // data return type
  ReservationType,
  // payload type
  { reservationId: string; timestamp: number },
  // thunkAPI type
  { state: RootState; rejectValue: string }
>(
  "organisation/updateReservation",
  async ({ reservationId, timestamp }, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user) throw new Error("User not logged in");

      const organisation = thunkAPI.getState().organisation.organisation;
      if (!organisation) throw new Error("Organisation not found");

      return await organisationService.updateReservationDate(
        organisation._id,
        reservationId,
        timestamp,
        user.token
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a reservation
export const deleteReservation = createAsyncThunk<
  // data return type
  { reservationId: string },
  // payload type
  string,
  // thunkAPI type
  { state: RootState; rejectValue: string }
>("organisation/deleteReservation", async (reservationId, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) throw new Error("User not logged in");

    const organisation = thunkAPI.getState().organisation.organisation;
    if (!organisation) throw new Error("Organisation not found");

    return await organisationService.deleteReservation(
      organisation._id,
      reservationId,
      user.token
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

export const organisationSlice = createSlice({
  name: "organisation",
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
    builder.addCase(registerOrganisation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerOrganisation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Organisation registered successfully";
      state.organisation = action.payload;
    });
    builder.addCase(registerOrganisation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.organisation = null;
    });
    builder.addCase(getOwnerOrganisation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOwnerOrganisation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.organisation = action.payload;
    });
    builder.addCase(getOwnerOrganisation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.organisation = null;
    });
    builder.addCase(createReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Reservation created successfully";
      state.organisation!.reservations.push(action.payload);
    });
    builder.addCase(createReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
    builder.addCase(updateReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateReservation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Reservation updated successfully";
      const reservation = state.organisation!.reservations.find(
        (reservation) => reservation._id === action.payload._id
      );
      if (reservation) reservation.timestamp = action.payload.timestamp;
    });
    builder.addCase(updateReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
    builder.addCase(deleteReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Reservation deleted successfully";
      state.organisation!.reservations =
        state.organisation!.reservations.filter(
          (reservation) => reservation._id !== action.payload.reservationId
        );
    });
    builder.addCase(deleteReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export const { reset } = organisationSlice.actions;
export default organisationSlice.reducer;
