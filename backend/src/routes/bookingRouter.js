import express from "express";
const bookingRouter=express.Router();

import{
    createOrder,verifyPayment,getUserBooking,getBookingDetails
}from "../controllers/bookingController.js"

import {protect} from "../controllers/authController.js"
bookingRouter.get("/",protect,getUserBooking);
bookingRouter.get("/:bookingId",getBookingDetails)
bookingRouter.post("/create-order",protect,createOrder)
bookingRouter.post("/verify-payment",protect,verifyPayment)

export{bookingRouter};

