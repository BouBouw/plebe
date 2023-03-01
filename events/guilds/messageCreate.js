const { ChannelType } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'messageCreate',
	once: false,
execute: async (message, client) => {
    if(!message.guild || message.channel.type === ChannelType.DM) return;
    await countMessage();

    await checkBoss();
    await levelSystem();

    async function countMessage() {
        if(message.author.bot) return;

        const row = db.get(`guild_${message.guild.id}_${message.author.id}.msg_count`)
        if(!row || row === null) {
            await db.set(`guild_${message.guild.id}_${message.author.id}.msg_count`, 1)
        } else {
            await db.add(`guild_${message.guild.id}_${message.author.id}.msg_count`, 1)
        }
    }

    async function checkBoss() {
        if(message.author.id === '853261887520505866') {
            if(message.content.includes('Bonjour') || message.content.includes('Salut') || message.content.includes('Coucou')) {
                message.reply({
                    content: `✨ Bonjour maître ${message.author}.`
                })
            }
        }

        if(message.author.id === '829449475268411413') {
            if(message.content.includes('Bonjour') || message.content.includes('Salut') || message.content.includes('Coucou')) {
                message.reply({
                    content: `✨ Bonjour capitaine ${message.author}.`
                })
            }
        }

        if(message.author.id === '871489328331767869') {
            if(message.content.includes('Bonjour') || message.content.includes('Salut') || message.content.includes('Coucou')) {
                message.reply({
                    content: `✨ Bonjour princesse ${message.author}.`
                })
            }
        }

        if(message.author.id === '433286510213726208') {
            if(message.content.includes('Bonjour') || message.content.includes('Salut') || message.content.includes('Coucou')) {
                message.reply({
                    content: `✨ Retourne dans les champs ${message.author}.`
                })
            }
        }
    }

    async function levelSystem() {
        if(message.author.bot) return;

        let initialExp = 399;

        async function checkLevel() {
            let exp = await db.fetch(`guild_${message.guild.id}_exp_${message.author.id}`);
            let rank = await db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`);

            const nextLevelExp = initialExp * (Math.pow(2, rank) - 1);

            if(nextLevelExp <= exp) {
                await db.add(`guild_${message.guild.id}_rank_${message.author.id}`, 1);
                return message.guild.channels.cache.get('1040345632088530974').send({ content: `:tada: - ${message.author}, tu viens d'atteindre le niveau \`${db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`)}\` !` })
            }
        }
        checkLevel();

        async function AddExp() {
            let rank = await db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`);

            let randomExp = Math.floor((Math.random() * message.content.length) * 2);

            if(rank !== 0) {
                await db.add(`guild_${message.guild.id}_exp_${message.author.id}`, Number(randomExp))
            } else {
                await db.set(`guild_${message.guild.id}_rank_${message.author.id}`, 1);
                await db.add(`guild_${message.guild.id}_exp_${message.author.id}`, randomExp);
            }
        }
        AddExp();
    }

    }
}