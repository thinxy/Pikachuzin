import { ExtendedClient } from "@/discord/structure/ExtendedClient";
import config from "@/settings/settings.json";
import("@/database/connect");

export * from "colors";

process.on("uncaughtException", err => {
	console.error(err);
});

process.on("unhandledRejection", err => {
	console.error(err);
});

const client = new ExtendedClient();

client.start();

export { client, config };
