import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: [true, 'please enter your property name']
    },
    description: {
        type: String,
        required: [true, 'please add information about your property']
    },
    extrainfo: {
        type: String,
        default: "checkin on time.good service."
    },
    propertyType: {
        type: String,
        enum:["house","flat","guest house","hotel"],
        default: "house"
    },
    roomType: {
        type: String,
        enum:["Anytype","Room","Entire Home"],
        default: "Anytype"
    },
    maximumGuest: {
        type: Number,
        required: [true, 'please give maximum no of guests that can occupy']
    },
    amenities: [
      {
        name: {
              type: String,
              required: true,
              enum: ["wifi","kitchen","ac","washing machine","tv","pool","free parking"]
            },
            icon:{
                type: String,
                required: true
            }
      }
    ],
    images: {
        type: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String,
                required: true
            }
        }],
        validate:{
            validator: function(value){
                return Array.isArray(value) && value.length >= 6;
            },
            message: 'the image must contain atleast 6 images'
        }
    },
    price : {
        type: Number,
        required: [true, 'please enter the price per night '],
        default: 500
    },
    address: {
        area:String,
        city:String,
        state:String,
        pincode:Number
    },
    currenBooking: [
        {
        
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            },
            fromDate:{
                type:Date
            },
            toDate:{
                type:Date,
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"

            }
        }

    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    slug: String,
    checkInTime: {type: String, default: "11:00 "},
    checkOutTime: {type: String, default: "13:00 "}

   

})

propertySchema.pre('save', function(){
    this.slug = slugify(this.propertyName, {lower: true});
})

propertySchema.pre('save', function(){
    if (this.address && this.address.city) {
        this.address.city = this.address.city.toLowerCase().replaceAll(" ","");
    }
})

const Property =mongoose.models.Property || mongoose.model('Property', propertySchema);
export {Property};


  
