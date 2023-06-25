import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
    to:{
        type: String,
        required: true
    },
    from: {
         type: String,
         required: true
    },
    subject: String,
    body: String,
    date: {
        type:Date,
        required: true
    },
    image: String,
    name: {
        type: String,
        required: true
    },
    starred: {
        type: Boolean,
        required: true,
        default: false
    },
    bin: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true
    },
})

//apply schema validataion on name in bracket that is email
//name of collection of schema in mongoos unlike name of table in mysql -> emails
//we have to apply schema on this emails collection
const email = mongoose.model('emails', EmailSchema);
export default email;