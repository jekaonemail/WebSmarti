import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        language: 'ua'
    },

    // create reducers
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        }, 

        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },

        loginError: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        logout: (state) => {
            state.currentUser = null;
        },

        changeLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
});

// export reducers
export const {loginStart, loginSuccess, loginError, logout, changeLanguage} = userSlice.actions;
export default userSlice.reducer;