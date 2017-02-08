// model for creating a user
class User {
  constructor( login, email, password, puuid = null ) {
    this.uuid     = (puuid)?puuid:uuid.v1();
    this.login    = login;
    this.email    = email;
    this.password = password;
    this.created  = new Date();;
  }
  // function for saving user to file
  save() {
    var user = JSON.stringify( this );
    fs.writeFile( `./database/users/${this.uuid}.json`, user );
  }

  static find( options ) {
    // scan json file
    var users = [];
    fs.readdirSync('./database/users').forEach((file)=>{
      var data = JSON.parse(fs.readFileSync(`./database/users/${file}`).toString());
      if( // search by uuid
          (options && options.uuid && data.uuid === options.uuid) ||
          // search by login and password
          (options && options.login && data.login === options.login && options.password && data.password === options.password) ||
          // search by email and paasword
          (options && options.password && data.password === options.password && options.email && data.email === options.email) ||
          // search by login and !password
          (options && options.login && data.login === options.login && !options.password) ||
          // search by login
          (options && options.login && data.login === options.login) ||
          // search with no options
          !options
        )
        users.push( new User( data.login, data.email, data.password, data.uuid ) );
      });
    return users;
  }
  // function for deleting user file
  delete() {
    var fileName = this.uuid;
    fs.unlink(`./database/users/${fileName}.json`, ()=>{
      console.log(fileName + ' File Deleted');
    });
  }
}
exports.User = User;
