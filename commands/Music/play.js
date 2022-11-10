const { ApplicationCommandType, ApplicationCommandOptionType, Colors } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, NoSubscriberBehavior, StreamType, VoiceConnectionStatus } = require('@discordjs/voice');

const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");

const youtube = new YouTubeAPI('AIzaSyAJccFnJD7r19SnFbkDhfhWKcpIQ3TuGAo');

module.exports = {
    name: 'play',
    description: '(🎶) Musique',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'term',
            description: 'Titre ou lien de la musique choisie.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
execute: async (client, interaction, args) => {
    const songTitle = interaction.options.getString("term");

    const serverQueue = interaction.client.queue.get(interaction.guild.id);

    const { channel } = interaction.member.voice;
    if(!channel) return interaction.followUp({ content: `❓ • ${interaction.member} vous devez être dans un salon vocal.` });

    //if(serverQueue && channel !== interaction.guild.voice.channel) return interaction.followUp({ content: `:x: • ${interaction.member}, je suis déjà en train de jouer dans un autre salon.` })

    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;

    const url = songTitle;
    const urlValid = videoPattern.test(songTitle);

    const queueConstruct = {
        textChannel: interaction.channel,
        channel,
        connection: null,
        songs: [],
        loop: false,
        volume: 50,
        muted: false,
        playing: true
    };

    let songInfo = null;
    let song = null;

    if(urlValid) {
        try  {
            songInfo = await ytdl.getInfo(url);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
            };
        } catch(err) {
            return interaction.followUp({ content: `🔍 • ${interaction.member} vidéo introuvable ou non publique.` })
        }
    } else {
        try {
            const results = await youtube.searchVideos(songTitle, 1, { part: "id" });

            if(!results.length) {
                return interaction.followUp({ content: `🔍 • ${interaction.member} vidéo introuvable ou non publique.` })
            }

            songInfo = await ytdl.getInfo(results[0].url);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
            };
        } catch(err) {
            return interaction.followUp({ content: `🔍 • ${interaction.member} vidéo introuvable ou non publique.` })
        }
    }

    if(serverQueue) {
        serverQueue.songs.push(song)
        return interaction.followUp({
            embeds: [{
                color: Colors.Blurple,
                title: '☑️ Musique ajoutée a la liste de lecture',
                description: `**__${song.title}__** (\` ~ ${Math.round(song.duration / 60)} min.\` )\n - Ajoutée par ${interaction.member}\n\n🌐 • ${song.url}`
            }]
        })
    } else {
        queueConstruct.songs.push(song);
        interaction.client.queue.set(interaction.guild.id, queueConstruct);
    }

    try {
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

        const streamOptions = { seek: 0, volume: 1, filter : 'audioonly' };
        const stream = ytdl(queueConstruct.songs[0].url, streamOptions);
        
        const resource = createAudioResource(stream, {
            inputType: StreamType.Arbitrary,
        });

        player.play(resource);

        queueConstruct.connection = await entersState(connection, VoiceConnectionStatus.Ready, 5000);
        await connection;
        connection.subscribe(player)
        interaction.followUp({
            embeds: [{
                color: Colors.Blurple,
                title: '☑️ Musique en cours',
                description: `**__${queueConstruct.songs[0].title}__** ( \`~ ${Math.round(queueConstruct.songs[0].duration / 60)} min.\` )\n - Ajoutée par ${interaction.member}\n\n🌐 • ${queueConstruct.songs[0].url}`
            }]
        })
    } catch(err) {
        console.log(err)
        interaction.client.queue.delete(interaction.guild.id);
        return interaction.channel.send({ content: `:x: - ${interaction.member} une erreur est survenue lors de la connexion au salon vocal.`})
    }

    }
}