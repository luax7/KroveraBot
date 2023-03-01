import { Feature } from "ark-handler";
import { GuildMember, TextChannel } from "discord.js";




export default {


    async Callback(client, HandlerClient) {

        const guild = await  client.guilds.fetch("850899393203666956")
        const channel = await guild.channels.fetch("851772997954175006") as TextChannel;

        client.addListener("AddMemberNotification", (Member : GuildMember) => {
            Member.roles.add("850941764649877524")
        })
        client.addListener("RemoveMemberNotification", (Member : GuildMember) => {
            Member.roles.remove("850941764649877524")
        })

        channel.createMessageCollector({
            
        }).on("collect", async(message) => {
            const Members = await guild.members.list();

            for(let index = 0 ; index < Members.size; index++) {
                const Member = Members.at(index)!;
                 
                if(Member.roles.cache.get("850941764649877524") ){

                    Member.send(message.content);

                }

            }})
    },

} as Feature;