import { Command } from "ark-handler";
import Discord from 'discord.js';
import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';
import { collector } from '../index';

export default {
hidden: true,

    async Callback(Message, Args, Client) {
        if(Message.author.id !== "340527910689570828") return;

        const Channel = await Message.author.createDM(true);
        const ExMessage = await (await Channel.send("\n Conteudo salvo")).reply("Por favor, envie os links ")

        const collector = Channel.createMessageCollector({
            max:1,
            time:10 * 1000 * 60
        })
        .on("collect", (message) => {

            if(message.content === "end"){
                collector.dispose(message)

                return
            }
            const Doubles = message.content.split("\n")

            const row = new ActionRowBuilder<ButtonBuilder>()

            for(var i = 0; i < Doubles.length; i++)
            {
                const Double = Doubles[i].split(":")
                row.addComponents( new ButtonBuilder({
                    
                    style: ButtonStyle.Link,
                    type: Discord.ComponentType.Button,
                    url:Double[1],
                    label:Double[0]
                    
                }))
            }

        }).on("dispose", () => {
            ExMessage.delete()
            Channel.send("Links encerrados, enviando referencias")
        })
        .on("end", () => {
            ExMessage.delete()
            Channel.send("Links encerrados, enviando referencias")
        })

    },

} as Command;