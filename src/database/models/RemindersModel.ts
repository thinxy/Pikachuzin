import { Schema, model } from "mongoose";

export interface R {
	_id: string;
	reminders: Array<any>;
}

export const RemindersSchema = new Schema<R>({
	_id: String,
	reminders: Array,
});

const Reminder = model<R>("reminders", RemindersSchema);
export default Reminder;
