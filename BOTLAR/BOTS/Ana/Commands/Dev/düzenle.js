const Backup = require("../../../../Helpers/Backup")
const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu, Client,Intents } = require("discord.js");
class Edit extends Command {
  constructor(client) {
    super(client, {
      name: "düzenle",
      aliases: ["edit"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("1")
        .setLabel("Guard")
        .setEmoji("1️⃣")
        .setStyle("SUCCESS"),
        new MessageButton()
        .setCustomId("2")
        .setLabel("Guard")
        .setEmoji("2️⃣")
        .setStyle("SUCCESS"),
        new MessageButton()
        .setCustomId("3")
        .setLabel("Guard")
        .setEmoji("3️⃣")
        .setStyle("SUCCESS"),
        new MessageButton()
        .setCustomId("4")
        .setLabel("Guard")
        .setEmoji("4️⃣")
        .setStyle("SUCCESS"),
    )
    const row2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("5")
        .setLabel("Guard")
        .setEmoji("5️⃣")
        .setStyle("SUCCESS"),
        new MessageButton()
        .setCustomId("iptal")
        .setLabel("İptal")
        .setEmoji("950072726150869003")
        .setStyle("DANGER")
    )
   const msg = await message.channel.send({components: [row,row2],embeds:[embed.setDescription(`Üzerinde işlem yapmak istediğin botu altta ki butonlar yardımıyla seç! 
    1️⃣ Guard Kontrol
    2️⃣ Guard1
    3️⃣ Guard2
    4️⃣ Guard3
    5️⃣ Guard4 `)]})
    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 120000 })
    collector.on("collect", async (i) => {
      if(i.customId == "1") {
        const a = new MessageActionRow().addComponents(
          new MessageSelectMenu()
          .setCustomId("edit")
          .setPlaceholder("Aşağıdan silmek istediğiniz menüyü seçin!")
          .addOptions(
              {label: "İsim Değiştir", description:"Botun Mevcut ismini değiştirir.",value:"nick"},
              {label: "Avatar Değiştir", description:"Botun Mevcut avatarını değiştirir.",value:"avatar"},
              {label: "Durum Değiştir", description:"Botun Mevcut avatarını değiştirir.",value:"presence"}

          ),
             
      )
        i.channel.send({components: [a],embeds:[embed.setDescription("1 Nolu Guardın üstünde yapmak istediğin işlemi aşşağıda ki menüden seç!")]}).then(async (oluşturuldu) => {
        var filter = i => i.customId == "edit"
        let collector = oluşturuldu.createMessageComponentCollector({filter: filter})
        collector.on('collect', async (i) => {
       if(i.values[0] == "nick") {  
         
           client.user.setUsername(args.join(" ")).then(()=> {
             oluşturuldu.channel.send("Botun ismi Başarıyla Değiştirildi.")
             oluşturuldu.delete();
             msg.delete()
            })
            
            
         }
         if(i.values[0] == "avatar") {  
          client.user.setAvatar(args.join(" ")).then(()=> {
            oluşturuldu.channel.send("Botun avatarı Başarıyla Değiştirildi.")
            oluşturuldu.delete();
            msg.delete()
           })
           
           
        }
        if(i.values[0] == "presence") {  
          client.user.setPresence({ activities: [{ name: args.slice(1).join(" ") }], status: args[0] });
           await oluşturuldu.channel.send("Botun durumu Başarıyla Değiştirildi.")
            await oluşturuldu.delete();
            await msg.delete()
           
           
           
        }
        })
      })
      }
    })
  }
}

module.exports = Edit