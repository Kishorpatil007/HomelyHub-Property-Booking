//propertyDetails
// create a slice name
// create iniatial state
// requests start
// property data recieved
// error occured
// export actions
// export Slice

import {createSlice} from '@reduxjs/toolkit';

const propertyDetailsSlice = createSlice({
    name: 'propertyDetails',
    initialState: {
        propertyDetails: {},
        loading: false,
        error: null,
    },
    reducers: {
        getListRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getPropertyDetails(state, action) {
            state.propertyDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        getErrors(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }   
}  )
export const propertyDetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;