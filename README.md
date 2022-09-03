# discord-tts-bot-v2
A discord bot that offer tts directly through the voice channel

## Installation

> npm i

Use this command to install every package needed

<b>Fill your config-template.json and delete the "-template" part</b>

If you want to select a custom language, set it at config, you can use "en, es, af, sq" and many others, consult [here](https://cloud.google.com/speech-to-text/docs/languages), because a bug with google-tts-api package, it only accepts the first part of the language BCP-47 code, if you want to use English (en-US), you will need to set "en".

> node deploy-commands

Run this command to load the slash commands

> node index.js

Start your bot!

##Commands

-join: joins the bot at your voice channel
-disconnect: disconnects the bot from the voice channel
-say <text>: plays the text
-setchannel <?channelID>: sets that channel as a default-ever tts mode 
