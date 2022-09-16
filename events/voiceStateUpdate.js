const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	async execute(oldState, newState, client) {
        const me = await newState.guild.members.fetchMe();
        if(me.voice.channel == undefined || me.voice.channel != oldState.channel || me.voice.channel == newState.channel) return;
        console.log(oldState.channel.members.size);
		if(oldState.channel.members.size > 1) return;

        const connection = getVoiceConnection(me.voice.channel.guild.id);
        if(connection)
            connection.destroy();
	},
};