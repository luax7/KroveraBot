import { Feature } from "ark-handler";

export default {

    Callback(client, HandlerClient) {
        client.on('messageCreate',async (message) => {

            if(!message.member!.permissions.has('Administrator')) return;

            if(message.content.includes("discord.gg")){
                await message.channel.send("Convites não são permitidos " + `<@${message.member!.id}>`)
                message.delete();
            }
            if(message.content.includes("www.") || message.content.includes("https://") || message.content.includes("http://") ) {
                await message.channel.send("Links não são permitidos " + `<@${message.member!.id}>`)
                message.delete()
            }   

        })
    },

} as Feature