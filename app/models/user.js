// model for creating a user
class User {
  constructor( login, email, password, puuid = null ) {
    this.uuid     = (puuid)?puuid:uuid.v1();
    this.login    = login;
    this.email    = email;
    this.password = password;
    this.created  = new Date();;

  }
  save() {
    var user = JSON.stringify( this );
    fs.writeFile( `./database/users/${this.uuid}.json`, user );
  }
  static find( login = null, email = null, password = null ) {
    // scan json file
    // 1) if login, email and password == null , return all [users]
    if( !login && !email && !password ) {
      var users = [];
      fs.readdirSync('./database/users').forEach((file)=>{
        var data = JSON.parse(fs.readFileSync(`./database/users/${file}`).toString());
        users.push( new User( data.login, data.email, data.password, data.uuid ) );
      });
      return users;
    }
    // 2) not null, then return the find ones
  }
  read() {

  }
  delete() {

    
  }
}
exports.User = User;
