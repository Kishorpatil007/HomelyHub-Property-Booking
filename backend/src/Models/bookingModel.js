//property
//user
//price
//dates
//guests
//paid

import mongoose from "mongoose";
import { User } from "./userModel.js";
const bookingSchema = new mongoose.Schema(
    {
        property:{
            type:mongoose.Schema.ObjectId,
            ref : "Property",
            required:[true,"booking must belong to property"]


        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref : "User",
            required:[true,"booking must belong to property"]

        },
        price:{
            type:Number,
            required:[true,"booking must have price"]
        },
        createdAt:{
            type:Date
            
        },
        paid:{
            type:Boolean,
            default:true
        },
        fromDate:{
            type:Date
        },
        
        toDate:{
            type:Date,
        },
        guests:{
            type:Number
        },
        numberOfnights:{
            type:Number
        }
    },
     {timestamps:true}


);


bookingSchema.pre(/^find/,function(){
    this.populate("user");
        this.populate({
        path:"property",
        select: "maximumGuest images propertyName address"
    }

    );
   


})
const Booking=mongoose.model("Booking", bookingSchema);
export{Booking};
