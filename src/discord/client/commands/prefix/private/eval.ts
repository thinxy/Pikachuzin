import { MessageCommand } from "@/discord/structure/types/Commands";
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	codeBlock,
} from "discord.js";

export default new MessageCommand({
	name: "eval",
	description: "ain nobru apelaun",
	aliases: ["e"],
	cooldown: 1000,
	async run({ client, message, args }) {
		if (
			!["315254767716663296", "667909298168266773"].includes(
				message.author!.id
			)
		)
			return;

		const code = args.join(" ");

		try {
			const resRaw = await eval(code as string);
			const res =
				typeof resRaw === "object" ? JSON.stringify(resRaw) : resRaw;

			const embed = new EmbedBuilder({
				color: 0x2b2d31,
				fields: [
					{
						name: "📥 Input",
						value: codeBlock("ts", `${code}`),
					},
					{
						name: "📤 Output",
						value: codeBlock("ts", res),
					},
				],
			});

			await message.reply({ embeds: [embed] });
		} catch (error) {
			await message.reply({
				content: `**Ocorreu um erro na execução do código.**\n${codeBlock(
					"powershell",
					error as string
				)}`,
			});
		}
	},
});
