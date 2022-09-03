const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Desconecta el bot del canal de voz'),
	async execute(interaction, client) {
        if(!interaction.member.voice.channel)
            return interaction.editReply({ ephemeral: true, content: "No estás en un canal de voz" });

        const me = await interaction.guild.members.fetchMe();
        if(me.voice.channel == undefined)
            return interaction.editReply({ ephemeral: true, content: "No estoy en un canal de voz" });

        const connection = getVoiceConnection(me.voice.channel.guild.id);
        connection.destroy();

		const embed = new EmbedBuilder()
                .setTitle(client.config.emotes.bye+" Adiooos")
                .setColor("#FFFFFF");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
};