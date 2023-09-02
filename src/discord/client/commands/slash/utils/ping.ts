import { SlashCommand } from "@/discord/structure/types/Commands";
import { ApplicationCommandType } from "discord.js";

export default new SlashCommand({
	name: "ping",
	description: "Veja minha latência com conexão á API do Discord.",
	descriptionLocalizations: {
		"en-US": " See my latency with Discord API connection.",
	},
	type: ApplicationCommandType.ChatInput,
	async run({ client, interaction }) {
		await interaction.reply({
			content: `\🏓 **Pong!**, Minha latência está em \`${
				client.ws.ping
			}ms\` e respondi está mensagem em \`${
				Date.now() - interaction.createdTimestamp
			}ms\`!`,
		});
	},
});
