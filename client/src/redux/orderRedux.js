import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: "order",
    initialState: {
        count: 0,
        ordersData: [],
        isFetching: false,
        error: false
    },

    reducers:{
        editOrder: (state, action) => {
            state.count = action.payload;
        }
    }
});

export const { editOrder } = orderSlice.actions;
export default orderSlice.reducer;