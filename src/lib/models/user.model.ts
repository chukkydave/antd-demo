import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
}, {
    timestamps: true,
});

// Prevent model overwrite error in development due to hot reloading
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
