const { ApplicationCommandType, Colors } = require('discord.js');

const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");

const youtube = new YouTubeAPI('AIzaSyAJccFnJD7r19SnFbkDhfhWKcpIQ3TuGAo');

module.exports = {
    name: 'skip',
    description: '(🎶) Musique',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    const serverQueue = interaction.client.queue.get(interaction.guild.id);

    if(serverQueue && serverQueue.connection.joinConfig.channelId !== interaction.member.voice.channelId) return interaction.followUp({ content: `:x: • ${interaction.member}, je suis déjà en train de jouer dans un autre salon.` })

    if(!serverQueue.songs[1]) return interaction.followUp({ content: `Aucune autre musique après celle-ci.` })

    const streamOptions = { seek: 0, volume: 1, filter : 'audioonly' };
    const stream = ytdl(serverQueue.songs[1].url, streamOptions);

    try  {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
                maxMissedFrames: Math.round(5000 / 20),
            }
        });

        const resource = createAudioResource(stream, {
            inputType: StreamType.Arbitrary,
        });
        player.play(resource);
    
        connection.subscribe(player)
    } catch(err) {
        interaction.client.queue.delete(interaction.guild.id);
        return interaction.channel.send({ content: `:x: - ${interaction.member} une erreur est survenue lors de la connexion au salon vocal.`})
    }
    }
}