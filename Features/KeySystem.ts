import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders'
import { Feature } from "ark-handler";
import { TextChannel, ButtonStyle } from "discord.js";

type KeyEntry = {
    keyword : string[];
    Message : string;
    exname : string;
}
let $f = require('../keywords.json') as KeyEntry[];
let NewUserMap : Map<string,number> = new Map();

export default {
    Callback(client, HandlerClient) {

        setInterval(() => {

            for(const key of NewUserMap.keys()){
                const val = NewUserMap.get(key) || 0

                if(val === 5 ) NewUserMap.delete(key);
                else NewUserMap.set(key, val+1);

            }
        },60 * 1000)

        client.on("messageCreate", async function(message){
            if(message.author.bot) return;
            if(message.channel.id !== "850899393754431500") return; // canal helper 
            if(message.author.id === "385760237493157898") return;

            if(!NewUserMap.has(message.member!.user.id) ) {
                message.reply("Olá, sou o atendente virtual e tentarei lhe ajudar, por favor fale em poucas palavras a sua dúvida.")
                NewUserMap.set(message.member!.user.id,0)
                return
            }

            const FoundKeys : Map<string,number> = new Map();
            let mets = 0;
            //Acha as keys 
            for(const entry in $f) {
                const keys = $f[entry].keyword;

                keys.forEach(element => {
                    if(message.content.toLocaleLowerCase().includes(element.toLocaleLowerCase())) {
                        mets ++

                        if(!FoundKeys.has($f[entry].exname)) FoundKeys.set($f[entry].exname,parseInt(entry))
                        
                    }
                })
            }


            //Verifica se existe alguma
            if( mets == 0 ) {
                const smg = await message.reply("Não encontrei em minha lista, nenhuma palavra relacionada a sua dúvida, desculpe, ainda estou aprendendo, se quiser tente uma outra palavra.")

                setTimeout(() => {
                    smg.delete();
                }, 10000)
                return ;
            } 

            const text : string = mets === 1 ? "Com base nas principais perguntas, encontrei uma palavra chave que possivelmente poderá lhe ajudar:" : "Com base nas principais perguntas, encontrei " + mets + " palavras chaves que possivelmente poderão lhe ajudar:";
            
            const row = new ActionRowBuilder<ButtonBuilder>()

            FoundKeys.forEach(entry => {
                row.addComponents(new ButtonBuilder()
                .setCustomId(entry.toString())
                .setLabel($f[entry].exname)
                .setStyle(ButtonStyle.Success)

            )})

            const uid = message.member!.user.id
            const FilterMessage = await message.reply({content: text, components: [row]})

            const filter = (i : any) => i.user.id === uid
            const channel = message.channel as TextChannel
            const collector =  channel.createMessageComponentCollector({
                filter: filter,
                time: 100*1000,
                max: 1
            })

            collector.on('collect', async $i => {
                await $i.reply({content : $f[parseInt($i.customId)].Message}).then((err) => {
                 if(err) return console.error(err);
                })
             })
            collector.on('end', () => {
                if(!FilterMessage) return
                FilterMessage.delete()
                return
            })

        
        

        })
    },
} as Feature