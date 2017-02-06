// model for creating a user
class User {
  constructor( login, email, password ) {
    this.uuid     = uuid.v1();
    this.login    = login;
    this.email    = email;
    this.password = password;
    this.created  = new Date().toDateString();
  }
  save() {
    var user = JSON.stringify( this );
    fs.writeFile( `./database/users/${this.uuid}.json`, user );
  }
  read() {

  }

}
exports.User = User;
