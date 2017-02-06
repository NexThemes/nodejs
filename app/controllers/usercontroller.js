/// User Logic


// shows the signup form
function signin(req, res){
  if (req.method == 'GET') {
    render.show(req,res,'signin');
  } else if(req.method == 'POST') {
    var dataV = '';
    // data + chunk
    req.on('data', (chunk)=>{ dataV += chunk });
    // transfer complete!
    req.on('end', ()=>{
      if (fs.existsSync('./data.json')) {
        // if file exists get the data from it
        fs.readFile('./data.json', 'utf8', function (err, data) {
          if (err) throw err;
          var users = JSON.parse(data);
          // after data require call the save user function
          dataLink = decodeURIComponent ( dataV.toString() );
          var workData = dataLink.split('&');
          for(var item in workData) {
            var secondPart = workData[item].split('=')[1];
            for(var user in users) {
              var checkPart = users[user].login;
              if(secondPart == checkPart) {
                console.log('Success');
                return;
              } else {
                console.log('No User Found');
              }
            }
          }
        })
      } else {
        console.log('User not found!');
      }
    });
    res.write('All good');
  };
};
// shows the signup form
function signup(req, res){
  if (req.method == 'GET') {
    render.show(req,res,'signup');
  } else if(req.method == 'POST') {
    var data = '';
    // data + chunk
    req.on('data', (chunk)=>{ data += chunk });
    // transfer complete!
    req.on('end', ()=>{
      // check if file exists
      // if (fs.existsSync('./data.json')) {
      //   // if file exists get the data from it
      //   fs.readFile('./data.json', 'utf8', function (err, data) {
      //     if (err) throw err;
      //     var users = JSON.parse(data);
      //     // after data require call the save user function
      //     saveUser(users);
      //   });
      // } else {
      //   // else create a empty array and save a new user
      //   var users = [];
      //   saveUser(users);
      // }
      // save user function
        dataLink = decodeURIComponent ( data.toString() );
        var workData = dataLink.split('&');
        var userData = {};
        workData.forEach((item)=>{
          userData[item.split('=')[0]] = item.split('=')[1];
        });
        var newUser = new user.User(userData.login, userData.email, userData.password);
        // save function for user
        newUser.save();

        // delete function for user
        // newUser.delete();
    });
    res.write('All good');
  };
};

// register a user
function create_account(req, res){

}

// exports of controllers
exports.signup = signup;
exports.signin = signin;
