import { Schema, model } from "mongoose";

export interface G {
	_id: string;
	config: {
		language: string;
		sugestao: {
			status: boolean;
			channel: string;
		};
		moderation: {
			warns: {
				count: number;
				motive: string[];
			};
		};
	};
}

export const GuildSchema = new Schema<G>({
	_id: String,
	config: {
		language: String,
		sugestao: {
			status: { type: Boolean, default: false },
			channel: { type: String, default: "null" },
		},
		moderation: {
			warns: {
				count: { type: Number, default: 0 },
				motive: { type: Array, default: [] },
			},
		},
	},
});

const Guild = model<G>("guilds", GuildSchema);
export default Guild;
