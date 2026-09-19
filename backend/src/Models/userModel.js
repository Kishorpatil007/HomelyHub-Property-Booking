//user schema

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    name: {type: String, 
    required: [true, "Please tell us your name!"],
    trim: true,
    maxlength: [50, "A user name must have less or equal than 50 characters"]
    },


    
    email: {type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"]

    },

    password: {type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "A password must have more or equal than 6 characters"],
    select: false
    },
    passwordConfirm: {type: String,
    required: [true, "Please confirm your password"],
    validate: {  
        validator: function(el) {
            return el === this.password;
        },
        message: "Passwords are not the same!"      
              }

    },
    phoneNumber: {type: String,
    required: true ,
    unique: true,
    trim: true, 
    },
    role: {type: String,
    enum: ["user", "admin"],
    default: "user"
    },
    avatar: {
        public_id: {type: String},
        url: {type: String},
    },
    passwordChangedAt:{
        type: Date
    },

    passwordResetToken: {
        select: false,
        type: String,
        index :true
    },
    passwordResetExpires: {
        select: false,
        type: Date
    },

},
{timestamps: true}  
) 


userSchema.set("toJSON", {
    transform: function(doc, ret) {
        delete ret.password; 
        delete ret.passwordConfirm;
        delete ret.passwordresetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }

})

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}   

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) { 
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    } 
return false;
} 
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}   

const User = mongoose.model("User", userSchema);
export {User};


