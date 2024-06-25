import mongoose, { models } from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema(
	{
		name: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String },
	},
	{ timestamps: true }
)

export const User = models?.User || mongoose.model('User', UserSchema)
