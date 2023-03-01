import Discord, { TextChannel } from 'discord.js'
import ark from 'ark-handler'

const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildIntegrations
    ]
})


const Ark = new ark (client, {
    CommandsDirectory : __dirname + '/Commands/',
    FeaturesDirectory : __dirname + '/Features/',
    PREFIX : 'k',
})
export const collector = ((await client.channels.fetch("850899393754431500")) as TextChannel).createMessageCollector()

client.login("MTA2ODYxNDYwOTgzNTEzNTA3OA.GQdnpR.zArTM6Ikz1PaWXP_fvfKPJ8WEOsp7oNtO0Tn9Y")