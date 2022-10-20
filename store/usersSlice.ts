import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/index";
import axios from "axios";

interface UserState {
  token: string;

  userLoading: boolean;
  userInfo: object | null;
  profile: object | null;
  errorMsg: any;
  activeAddress: any;
}
const initialState = {
  token: "",
  userLoading: false,
  userInfo: null,
  profile: null,
  errorMsg: "",
  activeAddress: 0,
} as UserState;

interface userArgsType {
  name?: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userArgs: userArgsType, { rejectWithValue }) => {
    const { name, email, password } = userArgs;

    try {
      const resReg = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      await axios.post("/api/auth/signin/email");
      let options = { redirect: false, email, password };
      // await signIn('credentials', options)
      return resReg;
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userArgs: userArgsType, { rejectWithValue }) => {
    const { email, password } = userArgs;
    try {
      const logReg = await axios.post("/api/auth/login", {
        email,
        password,
      });
      // await axios.post("/api/auth/signin/email");
      let options = { redirect: false, email, password };
      // await signIn('credentials', options)
      return logReg;
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

interface addressArgsType {
  id?: string;
  userAddress: object;
}

export const addAddress = createAsyncThunk(
  "users/addAddress",
  async (userArgs: addressArgsType, { rejectWithValue }) => {
    const { id, userAddress } = userArgs;

    try {
      const addRes = await axios.post("/api/users/address", {
        id,
        userAddress,
      });
      return addRes;
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

interface profileArgsType {
  id: string;
}

export const getProfile = createAsyncThunk(
  "users/getProfile",
  async (userArgs: profileArgsType, { rejectWithValue }) => {
    try {
      const profileRes = await axios.post("/api/users/profile", {
        id: userArgs,
      });
      return profileRes;
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetError(state) {
      state.errorMsg = "";
    },
    setActiveAddress(state, { payload }) {
      state.activeAddress = payload;
    },
    logOut(state) {
      (state.token = ""),
        (state.userLoading = false),
        (state.userInfo = null),
        (state.profile = null),
        (state.errorMsg = ""),
        (state.activeAddress = 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return {
        ...state,
        userLoading: true,
      };
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        userLoading: false,
        userInfo: payload.data,
        // token: payload.data.token,
        errorMsg: "",
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        userLoading: false,
        // userInfo: payload.data,
        // token: payload.data.token,
        errorMsg: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        userLoading: true,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
        userLoading: false,
        userInfo: payload.data,
        // token: payload.data.token,
        errorMsg: "",
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        userLoading: false,
        // userInfo: payload.data,
        // token: payload.data.token,
        errorMsg: action.payload,
      };
    });
    builder.addCase(addAddress.pending, (state) => {
      return {
        ...state,
        userLoading: true,
      };
    });
    builder.addCase(addAddress.fulfilled, (state, { payload }) => {
      return {
        ...state,

        userLoading: false,
        userInfo: payload.data,
        // token: payload.data.token,
        errorMsg: "",
      };
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      return {
        ...state,

        userLoading: false,
        // userInfo: payload.data,
        // token: payload.data.token,
        errorMsg: action.payload,
      };
    });
    builder.addCase(getProfile.pending, (state) => {
      return {
        ...state,
        userLoading: true,
      };
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      return {
        ...state,
        userLoading: false,
        profile: payload.data,
        errorMsg: "",
      };
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      return {
        ...state,
        userLoading: false,
        errorMsg: action.payload,
      };
    });
  },
});

export const { resetError, setActiveAddress, logOut } = usersSlice.actions;
export const selectUsers = (state: AppState) => <UserState>state.users;
export default usersSlice.reducer;
