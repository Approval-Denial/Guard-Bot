class Mongoose {
  static Connect(URL = ayarlar.MongoURL) {
          require('mongoose').connect(URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
          }).then(() => {
            console.log("Mongo Db Bağlantısı Başarıyla kuruldu.")
          }).catch((err) => {
            console.log("Mongo Db Bağlantısı Başarısız Oldu. " + err);
          });
  }
}

module.exports = { Mongoose }