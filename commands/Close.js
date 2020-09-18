var Discord = require('discord.js');
const kahrbadata = require('../data.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {

  if(!msg.channel.name.startsWith(`dm-`)) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${kahrbadata.generic.messages.noPermissions}`)
    .setDescription(`يمكنك فقط تنفيذ هذا الأمر في روم تذكرة المساعدة!`)
    .setColor(kahrbadata.generic.colour.error)
    .setTimestamp()
    .setFooter(`${kahrbadata.generic.footer}`, `${kahrbadata.generic.footerURL}`)
    msg.channel.send(embed)
    return;
  }

  let thisUser = msg.channel.name.replace('dm-', '')
  let user = client.users.get(thisUser);

  user.send('** Ticket has been closed by  ' +"``"+ msg.author.tag+ "``**")
  msg.channel.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['close']
};

exports.help = {
  name: 'Close MODE',
  description: 'للقفل التذكرة',
  usage: 'close'
};
