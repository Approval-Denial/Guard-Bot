const Backup = require("../../../../Helpers/Backup")
const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu, Client,Intents } = require("discord.js");
const pm2panel = require("../../../../../ap.config")
const children = require("child_process");

//equire("../../../../../ap.config").apps[0].name
class Bot extends Command {
  constructor(client) {
    super(client, {
      name: "bot",
      aliases: ["bot"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("start")
        .setLabel("Start")
        .setEmoji("◀️")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setCustomId("stop")
        .setLabel("Stop")
        .setEmoji("⏹️")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("restart")
        .setLabel("Restart")
        .setEmoji("🔃")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("iptal")
        .setLabel("İptal")
        .setEmoji("947538702945624125")
        .setStyle("DANGER"),
       
    )
    const liste = new MessageActionRow().addComponents(
      new MessageSelectMenu()
      .setCustomId("edit")
      .setPlaceholder("Guard Bot Listesi")
      .addOptions(
          {label: pm2panel.apps[0].name, description:pm2panel.apps[0].namespace,value:"guardkontrol"},
          {label: pm2panel.apps[1].name, description:pm2panel.apps[1].namespace,value:"guard1"},
          {label: pm2panel.apps[2].name, description:pm2panel.apps[2].namespace,value:"guard2"},
          {label: pm2panel.apps[3].name, description:pm2panel.apps[3].namespace,value:"guard3"},
          {label: pm2panel.apps[4].name, description:pm2panel.apps[4].namespace,value:"guard4"}
      ),
         
  )
   const msg = await message.channel.send({components: [liste],embeds:[embed.setDescription(`Aşağıda bulunan menüden üzerinde işlem yapıcağınız botu seçiniz.`)]})
   var filter = i => i.customId == "edit"
   let anamesaj = msg.createMessageComponentCollector({filter: filter})
   anamesaj.on('collect', async (i) => {
  if(i.values[0] == "guard1") { 
    await msg.delete()
    i.reply({components:[row], embeds:[embed.setDescription(`**${pm2panel.apps[1].namespace}** adlı botu Açmak/Kapamak/Yeniden Başlatmak için butonları kullanabilirsiniz.`)]})
    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 120000 })
    collector.on("collect", async (i) => {
      if(i.customId == "stop") {
          await children.exec(`pm2 stop ${pm2panel.apps[1].namespace}`)
         if(msg) await msg.delete()
          i.reply({embeds:[embed.setDescription(`İşlem Başarılı. \`${pm2panel.apps[1].namespace}\` Durduruldu.`).addField("Detay;",Discord.Formatters.codeBlock("js", list))]})
     
      
      }
      if(i.customId == "restart") {
       
      }
      if(i.customId == "iptal") {
       
      }
    })

   } 
} )
    
  }
}

module.exports = Bot