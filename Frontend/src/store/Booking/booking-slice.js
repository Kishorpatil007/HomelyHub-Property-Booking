//managing booking

//store all booking

//store individual booking details
//track the api loading status
//add a new booking when a booking is created

//updating the booking when we recieve from the backend

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    bookings: [],
    bookingDetails: {},
    loading: false,
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingsRequest: (state) => {
            state.loading = true;
        },
        //stores the booking received from  the api
        setBookings: (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        },
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        },
        setBookingDetails: (state, action) => {
            state.bookingDetails = action.payload.bookings;
        }
    }
})

export const { setBookingsRequest, setBookings, addBooking, setBookingDetails } = bookingSlice.actions;
export default bookingSlice;
