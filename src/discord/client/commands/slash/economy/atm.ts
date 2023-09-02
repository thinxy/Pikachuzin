import { SlashCommand } from "@/discord/structure/types/Commands";
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";

export default new SlashCommand({
	name: "saldo",
	nameLocalizations: { "en-US": "wallet" },
	description: "Veja sua carteira de PokeGems ou a de algum usuário.",
	descriptionLocalizations: {
		"en-US": "View your wallet or a user's wallet.",
	},
	type: ApplicationCommandType.ChatInput,
	options: [
		{
			name: "usuário",
			nameLocalizations: { "en-US": "user" },
			description:
				"Coloque o ID ou mencione o usuário que você deseja ver o saldo.",
			descriptionLocalizations: {
				"en-US":
					"Put the ID or mention the user you want to see the balance.",
			},
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
	async run({ client, interaction, options }) {
		let user = options.getUser("usuário") || interaction.user;
		let doc = await client.database.users.findOne({ _id: user.id });

		if (!doc) doc = await client.database.users.create({ _id: user.id });

		let wallet = doc!.economy.money || 0;

		const rank = await client.database.users.find(
			{ $nor: [{ "economy.money": 0 }] },
			"economy.money",
			{ sort: { "economy.money": -1 } }
		);

		let position =
			wallet == 0 ? "+999" : rank.findIndex(x => x._id === user.id) + 1;

		let row = new ActionRowBuilder<ButtonBuilder>({
			components: [
				new ButtonBuilder({
					customId: "ranking",
					label: `Posição #${position}!`,
					style: ButtonStyle.Success,
					emoji: {
						name: "top5",
						id: "1130566069799632947",
						animated: false,
					},
					disabled: true,
				}),
			],
		});

		await interaction.reply({
			content: `\🪙 **->** ${interaction.user}, ${
				user.id === interaction.user.id
					? "Você"
					: `O usuário \`${user.tag}\`,`
			} atualmente possuí **${wallet?.toLocaleString()} PokeGems**, para ver o top dos mais ricos utilize o comando "/ranking".`,
			components: [row],
		});
	},
});
