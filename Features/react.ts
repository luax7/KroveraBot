import { Feature } from "ark-handler";
import { TextChannel } from "discord.js";
import { collector } from "..";

export default {
    async Callback(client, HandlerClient) {
        collector.on('collect' , (message) => {
            
        })
    },
} as Feature