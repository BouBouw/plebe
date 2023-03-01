const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, Colors, ButtonStyle } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: 'setup',
    description: '(💞) Developers',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    const channel = client.channels.cache.get('1040345428140490863');

    const row_0 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('men')
                .setEmoji('🚹')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('women')
                .setEmoji('🚺')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('other')
                .setEmoji('❓')
                .setStyle(ButtonStyle.Secondary)
        )

    const row_1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('minor')
                .setEmoji('🧒')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('major')
                .setEmoji('👨')
                .setStyle(ButtonStyle.Secondary),
        )
        
    const row_2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('fr')
                .setEmoji('🇫🇷')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('ch')
                .setEmoji('🇨🇭')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('es')
                .setEmoji('🇪🇸')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('al')
                .setEmoji('🇩🇿')
                .setStyle(ButtonStyle.Secondary),
        )

        const row_3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ma')
                    .setEmoji('🇲🇦')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('tn')
                    .setEmoji('🇹🇳')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('cn')
                    .setEmoji('🇨🇳')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('vi')
                    .setEmoji('🇻🇳')
                    .setStyle(ButtonStyle.Secondary),
            )
        
        const row_4 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('th')
                        .setEmoji('🇹🇭')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('tr')
                        .setEmoji('🇹🇷')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('it')
                        .setEmoji('🇮🇹')
                        .setStyle(ButtonStyle.Secondary),
                )

    await channel.send({
        embeds: [{
            color: Colors.Green,
            title: `Sexe`,
            description: `Choisissez votre sexe.`,
            fields: [
                {
                    name: `Homme`,
                    value: "Cliquez sur l'émoji `🚹` ci-dessous.",
                },
                {
                    name: `Femme`,
                    value: "Cliquez sur l'émoji `🚺` ci-dessous.",
                },
                {
                    name: `Autre`,
                    value: "Cliquez sur l'émoji `❓` ci-dessous.",
                }
            ]
        }],
        components: [ row_0 ]
    })

    await channel.send({
        embeds: [{
            color: Colors.Green,
            title: `Age`,
            description: `Choisissez votre tranche d'âge.`,
            fields: [
                {
                    name: `- 18 ans`,
                    value: "Cliquez sur l'émoji `🧒` ci-dessous.",
                },
                {
                    name: `+ 18 ans`,
                    value: "Cliquez sur l'émoji `👨` ci-dessous.",
                }
            ]
        }],
        components: [ row_1 ]
    })

    await channel.send({
        embeds: [{
            color: Colors.Green,
            title: `Origines`,
            description: `Choisissez votre / vos origine(s).`,
            fields: [
                {
                    name: `France`,
                    value: "Cliquez sur l'émoji `🇫🇷` ci-dessous."
                },
                {
                    name: `Suisse`,
                    value: "Cliquez sur l'émoji `🇨🇭` ci-dessous."
                },
                {
                    name: `Espagne`,
                    value: "Cliquez sur l'émoji `🇪🇸` ci-dessous."
                },
                {
                    name: `Algérie`,
                    value: "Cliquez sur l'émoji `🇩🇿` ci-dessous."
                },
                {
                    name: `Maroc`,
                    value: "Cliquez sur l'émoji `🇲🇦` ci-dessous."
                },
                {
                    name: `Tunisie`,
                    value: "Cliquez sur l'émoji `🇹🇳` ci-dessous."
                },
                {
                    name: `Chine`,
                    value: "Cliquez sur l'émoji `🇨🇳` ci-dessous."
                },
                {
                    name: `Vietnam`,
                    value: "Cliquez sur l'émoji `🇻🇳` ci-dessous."
                },
                {
                    name: `Thailande`,
                    value: "Cliquez sur l'émoji `🇹🇭` ci-dessous."
                },
                {
                    name: `Turquie`,
                    value: "Cliquez sur l'émoji `🇹🇷` ci-dessous."
                },
                {
                    name: `Italien`,
                    value: "Cliquez sur l'émoji `🇮🇹` ci-dessous."
                },
            ]
        }],
        components: [ row_2, row_3, row_4 ]
    })

    }
}