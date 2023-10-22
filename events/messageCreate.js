const { ChannelType } = require('discord.js');
const config = require('../config.json')
const constantes = require('../assets/constantes.json');

module.exports = (client, messageCreate) => {
  if (messageCreate.author.bot) return
  
  if (messageCreate.attachments.size !== 0) return

  const member = messageCreate.author.id;

  if (messageCreate.channel.type === ChannelType.DM) {
    let contenu = messageCreate.content
    let dest = client.channels.resolve('1099629661371240460')

    dest.send(`<@323218593275969548> <@1071171895971557458>`)
    dest.send(`Message envoyé par <@${member}> :`)
    dest.send(contenu)
    
    messageCreate.reply('Votre message a bien été transmis. Si une réponse est attendue, elle sera apportée sous peu. Merci pour votre message !')
  }


}
