import mongoose, { Schema } from 'mongoose';
export const UserSchema = new Schema({
	first_name: { type: String, default: null },
	last_name: { type: String, default: null },
	email: { type: String, unique: true },
	password: { type: String },
	token: { type: String }
	},{ collection: 'users' }
);

UserSchema.index({ email: 1, username: 1 });

export default mongoose.model('User', UserSchema);
