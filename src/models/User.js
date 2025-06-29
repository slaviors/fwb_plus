import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        default: 'admin'
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export class UserClass {
    static async findByUsername(username) {
        const mongoose = await import('../lib/mongodb.js');
        await mongoose.default();
        return await User.findOne({ username });
    }

    static async create(userData) {
        const mongoose = await import('../lib/mongodb.js');
        await mongoose.default();

        const hashedPassword = await bcrypt.hash(userData.password, 12);

        const user = new User({
            username: userData.username,
            password: hashedPassword,
            role: userData.role || 'admin'
        });

        const savedUser = await user.save();
        return savedUser;
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

export { UserClass as User };