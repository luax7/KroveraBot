import { EmbedBuilder } from "@discordjs/builders";
import { Feature } from "ark-handler";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
    Callback(client, HandlerClient) {

        const embed = new EmbedBuilder({
            author : {
                name : "KroveraOT",
                icon_url: client.user?.avatarURL()!,
            },
            description : "Para usar o servidor você precisa se registrar. Registre-se com o botão abaixo",
            title : "Bem vindo ao krovera",
        })
        

        client.on('guildMemberAdd' , async (member) => {
            const channel = await member.user.createDM()

            const row = new ActionRowBuilder<ButtonBuilder>()
            row.addComponents(
                new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setCustomId("Reg")
            )

           const message = ( await channel.send({embeds: [embed],components:[row]}))
           const Collector = message.createMessageComponentCollector({
                max:1,
                filter : ($i) => $i.customId === "Reg",
            })

            Collector.on('collect', ($i) => {
                $i.reply(`Obrigado`)
            })  
            
        })
    },
} as Feature