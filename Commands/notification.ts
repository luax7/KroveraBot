import { Command } from "ark-handler";
import Discord from 'discord.js';
import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';

export default {
hidden: true,

    async Callback(Message, Args, Client) {
        if(Message.author.id !== "340527910689570828") return;

        const Channel = await Message.author.createDM(true);
        Channel.send("\n Conteudo salvo, referencias e links")

        Channel.createMessageCollector()
        .on("collect", (message) => {

            const separatas = message.content.split(' ');
            const row = new ActionRowBuilder<ButtonBuilder>()

            for(const Link in separatas )
            {
                row.addComponents( new ButtonBuilder({
                    
                    style: ButtonStyle.Link,
                    type: Discord.ComponentType.Button,
                    url:Link,
                    
                }))
            }

        })

    },

} as Command;