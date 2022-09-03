const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setchannel')
		.setDescription('Establece el canal de voz para hablar a través del bot')
        .addStringOption(option => option.setName('id').setDescription('El ID canal a establecer').setRequired(false)),
	async execute(interaction, client) {
        let canal = interaction.options.getString('id');
        if(canal == null)
            canal = interaction.channelId;

        try {
            await client.mongo.db(client.config.mongoDB.dbname).collection("servers").findOneAndUpdate({guildid: interaction.guild.id}, {$set: {ttsid: canal}}, {upsert: true}, (err,res)=>{
                if(err) throw err;
                client.ttsChannel = canal;
                return interaction.editReply(`Canal actualizado`);
            });
        } catch(e){
            return interaction.editReply(`Hubo un error con la base de datos: ${e}`);
        }
	},
};