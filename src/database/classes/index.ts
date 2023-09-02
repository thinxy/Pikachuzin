import User from "../models/UsersModel";
import Guild from "../models/GuildsModel";
import Reminder from "../models/RemindersModel";

export default class Database {
	public users = User;
	public guilds = Guild;
	public reminds = Reminder;

	public async findOrCreate(id: string, type: string, filter: string = "") {
		if (type == "users") {
			let data = await User.findOne({ _id: id }, filter);
			if (!data) data = await User.create({ _id: id });
			return data;
		} else if (type == "guilds") {
			let data = await Guild.findOne({ _id: id }, filter);
			if (!data) data = await Guild.create({ _id: id });
			return data;
		}
	}

	public async updateCoins(id: string, amount: number): Promise<boolean> {
		if (!amount || !id || isNaN(amount)) return false;
		await User.updateOne(
			{ _id: id },
			{ $inc: { "economy.money": amount } },
			{ upsert: true }
		);
		return true;
	}

	public async reminder(
		id: string,
		content: string,
		message: any,
		start: string | number,
		ends: string | number
	) {
		await Reminder.updateOne(
			{ _id: id },
			{
				$push: {
					reminders: {
						user: id,
						channel: message.channel.id,
						guild: message.guild.id,
						message: message.id,
						url: message.url,
						content: content,
						endsIn: ends,
						startedIn: start,
					},
				},
			},
			{ upsert: true }
		);
	}
}
