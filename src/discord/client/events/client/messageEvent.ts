import ms from "ms";
import { client, config } from "../../../..";
import { Event } from "@/discord/structure/types/Events";
import { relativeTime } from "util-stunks";

export default new Event({
	name: "messageCreate",
	async run(message) {
		if (!message.inGuild() || message.author.bot) return;
		const prefix = "a?";

		if (!message?.content.toLowerCase().startsWith(prefix)) return;

		let args = message?.content.slice(prefix.length).trim().split(/ +/g),
			cmd = args.shift()!.toLowerCase();
		if (cmd?.length === 0) return;

		let command = client.MessageCommands.get(cmd);
		if (!command)
			command = client.MessageCommands.get(client.aliases.get(cmd)!);

		if (command) {
			if (!Object.values(config.perms.adm).includes(message.author.id)) {
				let userCooldown = client.cooldowns.get(message.author.id);
				if (userCooldown?.time > Date.now()) {
					client.cooldowns.set(message.author.id, {
						attempts: userCooldown?.attempts
							? userCooldown?.attempts + 1
							: 1,
						time:
							userCooldown?.attempts > 0
								? userCooldown?.time + 4500
								: userCooldown?.time,
					});
					if (userCooldown?.attempts >= 5) {
						await client.database.users.updateOne(
							{ _id: message.author.id },
							{
								$set: {
									"ban.isTemp": true,
									"ban.date": Date.now(),
									"ban.reason":
										"[AUTOMOD] Tentativas máximas de execução de comandos em cooldown. (FLOOD)",
									"ban.temp": Date.now() + ms("30m"),
								},
							}
						);

						return await message.reply(
							`\❌ **->** ${message.author}, você foi banido de utilizar meus comandos por **30 minutos**, pelo motivo de flood, eu tentei de avisar, espero que aprenda.`
						);
					} else {
						let leftTime = relativeTime(
								client.cooldowns.get(message.author.id)?.time,
								{ removeMs: true }
							),
							userAttempts = userCooldown?.attempts;

						await message.reply(
							`\⏰ **->** ${message.author}, aguarde \`${
								leftTime ? leftTime : "alguns milissegundos"
							}\` antes de usar outro comando. \`(${
								userAttempts + 1
							}/5)\``
						);
					}
					return;
				}
			}

			client.cooldowns.set(message.author.id, {
				attempts: 0,
				time: Date.now() + command.cooldown,
			});

			try {
				command.run({ client, message, args });
			} catch (err) {
				console.error(
					`❌ | An error ocurred while trying to run the Message Commands (/): \n${err}`
				);
			}
		}
	},
});
