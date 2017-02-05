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
      if (fs.existsSync('./data.json')) {
        // if file exists get the data from it
        fs.readFile('./data.json', 'utf8', function (err, data) {
          if (err) throw err;
          var users = JSON.parse(data);
          // after data require call the save user function
          saveUser(users);
        });
      } else {
        // else create a empty array and save a new user
        var users = [];
        saveUser(users);
      }
      // save user function
      function saveUser(users) {
        dataLink = decodeURIComponent ( data.toString() );
        var workData = dataLink.split('&');
        var user = {};
        for(var item in workData) {
          var firstPart = workData[item].substr(0, workData[item].indexOf('='));
          var secondPart = workData[item].split('=')[1];
          if(firstPart == 'login') {
            user.login = secondPart;
          } else if (firstPart == 'email') {
            user.email = secondPart;
          } else {
            user.password = secondPart;
          };
        };
        users.push(user);
        // write the new user in a file
        fs.writeFile('./data.json', JSON.stringify(users),
            function (err) {
                if (err) {
                    console.error('Cannot create file!');
                }
            }
        );
      };
      // 1) HomeWork separate by = to : and make it as a object
      // 2) Same but 2 fields for the sign in
      // 3) with FS.file check registered user
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
