

const iltifatlar = [
  "Sevmenin gücünün sınırı yoktur.",
 "Geldiğin yerde aşkı aramak zorunda değilsin. Ben senin için buradayım.",
 "Aşkın en büyük hediyesi, dokunduğu her şeyi kutsal kılma yeteneğidir.",
 "Kısa süre önce aşık olduğumuz insanlarla birlikte olmaktan duyduğumuz derin sevinç gizlenemez.",
 "Bir manzara olduğundan habersiz duruşun.",
 "Öpüyorum gökyüzü gibi bakan gözlerinden.",
 "Güneşi olmayan kalbe gökkuşağı açtırdın güzel insan.",
 "Sonra mucize diye bir şeyden bahsettiler. Gözlerin geldi aklıma.",
 "Biraz güler misin? İlaç alacak param yok da.",
 "Sen yeter ki çocukluk yap. Gönlümde salıncağın hazır.",
 "Dokunmadan sevmenin mümkün olduğunu senden öğrendim.",
 "Senin gülüşün benim en sevdiğim mevsim.",
 "Hayal ettiğim ne varsa seninle yaşamak istiyorum.",
 "Bazen öyle güzel gülüyorsun ki, bütün dünya kör olsun istiyorum.",
 "Mutluluk nedir dediler, yanında geçirdiğim anların anlamını anlatamadım.",
 "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
 "Etrafımda olduğunda başka bir şeye ihtiyacım olmuyor.",
 "Seni hak edecek ne yaptım bilmiyorum. Nasıl bu kadar şanslı olabilirim?",
 "Kahverengi gözlerinle gökyüzü gibi bakıyorsun.",
 "Sen olmadan nasıl var olacağımı bilmiyorum.",
 "Narinliğini gören kelebekler seni kıskanır.",
 "Geceyi aydınlatan ay misali senin parlayan gözlerin ışık saçıyor gönlüme.",
 "Güneşe gerek yok, gözlerindeki sıcaklık içimi ısıtıyor.",
 "Bir insanın gülüşünden cennet mi görünür? Bir gülüyorsun cennetten bir fragman yayınlanıyor sanki.",
 "Güneş mi doğdu yoksa sen mi uyandın?",
 "Sabahları görmek istediğim ilk şey sensin.",
 "Seni senden daha çok seviyorum anlasana.",
 "Hayatım tamamen senin üzerine kurulu.",
 "Gel de, kapında yatayım, git de, kölen olayım.",
 "Gözlerinin renginde boğulmuşum ben.",
 "Burası huzur kokmuş buradan geçmişsin belli.",
 "Manzara seyretmek için gidilen bir yerde bile senden güzel bir görsel olamaz.",
 "Ne kadar fedakar olursanız olsun, adı gün gelir “yapmasaydın” olur.",
 "O kadar iyi bir arkadaşsın ki, tanıştığın herkes için mükemmel bir hediye gibisin.",
 "Su gibi duru güzelliğin karşısında dili tutulur tüm şairlerin.",
 "Sen daha önce hiç yazılamamış bir şiirin en güzel mısrası gibisin. Öyle gizlenmiş, kendine saklanmış, eşsiz.",
 "Kusursuz tavırların var. Korkunç kararlar verdiğimde beni yargılamadığın için sana minnettarım.",
 "Tek bir göz hareketiyle aklımı başımdan alan tek kadınsın.",
 "Ben senin kirpiklerinin rastgele dizildiğine inanmıyorum.",
 "Sen muhteşemin kelime anlamının tam karşılığısın.",
 "Bana şair diyorlar da senin şiir olduğunu göremiyorlar.",
 "Bir gülüşün etrafa ışıklar saçtığını sen de gördüm.",
 "Güzelliğini anlatacak kadar zengin bir lisan yok dünyada.",
 ]
 var KüfürSayısı = 0;
class messageCreatei {
  Event = "messageCreate"
  async run(message) {
    if(message.channel.id !== "980373415301087243") return;
    if (message.author.bot || message.channel.type == "dm") return;
      KüfürSayısı++;
      if (KüfürSayısı >= 50) {
        KüfürSayısı = 0;
        message.reply({content:`${message.member}, ${iltifatlar[Math.floor(Math.random() * iltifatlar.length)]}`})
      };
  }
}

module.exports = messageCreatei