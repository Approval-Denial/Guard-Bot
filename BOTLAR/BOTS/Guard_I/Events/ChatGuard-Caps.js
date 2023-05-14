

var capsSayısı;
var CapsSınırı;
class messageCreatec {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || message.member.permissions.has("ADMINISTRATOR") || message.channel.type == "dm") return;
    var capsSayısı;
    var CapsSınırı;
    let matched = message.content.replace(capsEngel, "").length
    let yuzde = percentage(matched, message.content.length)
    if (  Math.round(yuzde) > 50) {
      if (message.deletable) message.delete().catch(err => err);
      capsSayısı++;
      if (capsSayısı >= 5) {
        capsSayısı = 0;
        CapsSınırı++
        if(CapsSınırı >= 5){
          CapsSınırı = 0;
          message.guild.members.cache.get(message.member.id).timeout(ms("5m"), "Caps Sınırını Geçti ve Zaman aşımı uygulandı - VATE CHAT")
          return message.channel.send({content:`${message.member} **5 Dakika** boyunca zaman aşımı uyguladım. Büyük Harf Kullanma!`}).then(x=> setTimeout(() => {if(x) x.delete()}, 10 * 1000))
        }
        message.channel.send({content:`${message.member}, Lütfen daha çok küçük harf kullanmaya özen göster. ${5 - CapsSınırı} uyarı sonra **1 Dakika** Zaman aşımı uygulamak zorunda kalıcam.`}).then(x=> setTimeout(() => {if(x) x.delete()}, 5 * 1000))
      };
    }
  }
}
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
} 
module.exports = messageCreatec