import { Schema, model } from "mongoose";

export interface U {
	_id: string;
	ban: {
		isTemp: boolean;
		is: boolean;
		date: number;
		reason: string;
		temp: number;
	};
	economy: {
		money: number;
	};
}

export const UserSchema = new Schema<U>({
	_id: String,
	ban: {
		isTemp: { type: Boolean, default: false },
		is: { type: Boolean, defualt: false },
		date: { type: Number, default: 0 },
		reason: { type: String, default: "Nenhum motivo específicado." },
		temp: { type: Number, default: 0 },
	},
	economy: {
		money: { type: Number, default: 0 },
	},
});

const User = model<U>("users", UserSchema);
export default User;
