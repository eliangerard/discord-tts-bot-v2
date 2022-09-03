module.exports = {
	name: 'messageCreate',
    once: false,
	async execute(message, client) {
		//Check if already exist a Channel dedicated
        if(!client.firstVerify){
            client.firstVerify = true;
            await client.mongo.db(client.config.mongoDB.dbname).collection("servers").findOne({guildid: message.guild.id}, async (err,res)=>{
                if(err) throw err;
                if(res != null && res.ttsid != undefined){
                    client.ttsChannel = res.ttsid;
                    await client.channels.resolve(client.ttsChannel).send("Me acaban de reiniciar carnal, manda el mensaje otra vez no seas malito 😎👍");
                    console.log(`The channel ${client.ttsChannel} is already setted, so I will use it :)`)
                }
            });
        }

        if(client.ttsChannel != null && message.channelId == client.ttsChannel && !message.member.user.bot){
            const command = client.commands.get('say');
	        if (!command) return;

    	    return command.msgExecute(message);
        }
	},
};