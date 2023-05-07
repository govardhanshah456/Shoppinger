import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server"
const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
};
export const loadUser = createAsyncThunk('user/loadUser', async () => {
    const response = await axios.get(`${server}/user/getuser`, { withCredentials: true });
    return response.data;
});
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: {
        [loadUser.pending]: (state) => {
            state.loading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
    },

});

export const { loadUserRequest, loadUserSuccess, loadUserFail } =
    userSlice.actions;

export default userSlice.reducer;
