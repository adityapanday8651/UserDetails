const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phoneNumber:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    subscriberDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports= mongoose.model('UserDetails', userSchema);