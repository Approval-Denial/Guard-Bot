

   var EmojiSayısı;
   var EmojiSınırı;
const emojiEngel = /<a?:.+?:\d+>|[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

class messageCreates {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || message.member.permissions.has("ADMINISTRATOR") || message.channel.type == "dm") return;
    var EmojiSayısı;
    var EmojiSınırı;
  if(emojiEngel.test(message.content) && message.content.match(emojiEngel).length > 5){
    if (message.deletable) message.delete();
    EmojiSayısı++;
      if (EmojiSayısı >= 5) {
        EmojiSınırı++
        EmojiSayısı = 0;
        if(EmojiSınırı >= 5){
          EmojiSınırı = 0;
          message.guild.members.cache.get(message.member.id).timeout(ms("1m"), "Emoji Sınırını Geçti ve Zaman aşımı uygulandı - VATE CHAT")
          return message.channel.send({content:`${message.member} **1 Dakika** boyunca zaman aşımı uyguladım. Fazla sayıda emoji Kullanma!`}).then(x=> setTimeout(() => {if(x) x.delete()}, 10 * 1000))
        }
        message.channel.send({content:`${message.member}, daha az emoji kullanmalısın. ${5 - EmojiSınırı} uyarı sonra **1 Dakika** Zaman aşımı uygulamak zorunda kalıcam.`}).then(x=> setTimeout(() => {if(x) x.delete()}, 5 * 1000))
      };
    }
  }
}

module.exports = messageCreates