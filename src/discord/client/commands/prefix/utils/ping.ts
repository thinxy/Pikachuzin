import { MessageCommand } from "@/discord/structure/types/Commands";

export default new MessageCommand({
	name: "ping",
	description: "Veja minha latência atual com o Discord.",
	aliases: ["pong"],
	category: "Geral",
	cooldown: 5000,
	async run({ client, message, args }) {
		var msg = await message.reply({ content: `ping?` }).then(msg =>
			msg.edit({
				content: `**🏓 Pong!**, minha latência está em \`${Math.round(
					client.ws.ping
				)}ms\` e eu respondi está mensagem em \`${
					message.createdTimestamp - Date.now()
				}ms\`!`,
			})
		);
	},
});
