import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true

    },
    id: {
        type: String,
        required: true

    }




});

const userType = mongoose.model('User', userSchema);

export default userType;