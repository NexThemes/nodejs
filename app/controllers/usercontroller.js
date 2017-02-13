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
      dataLink = decodeURIComponent ( dataV.toString() );
      var workData = dataLink.split('&');
      var logChek = (workData[0].split('=')[1]);
      var passChek = (workData[1].split('=')[1]);
      var foundData = user.User.find({ login: logChek });
      foundData.forEach((name)=>{
        if(name.password == passChek) {
          req.session.put('userid', name.uuid);
          req.session.save(()=>{});
          console.log('Wellcome ' + logChek);
          return;
        } else {
          console.log("No Such User!");
        }
      });
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
    // add all data toghever by chunks
    req.on('data', (chunk)=>{ data += chunk });
    // transfer complete!
    req.on('end', ()=>{
      // save user function
      dataLink = decodeURIComponent ( data.toString() );
      var workData = dataLink.split('&');
      var userData = {};
      workData.forEach((item)=>{
        userData[item.split('=')[0]] = item.split('=')[1];
      });
      // sanitize
      userData.login = sanitize.value(userData.login, /^[a-z0-9]{5,}$/i);
      if(userData.login) {
        userData.email = sanitize.value(userData.email, 'email');
        if(userData.email) {
          userData.password = sanitize.value(userData.password, /^[A-Za-z0-9]{5,}$/i);
          if(userData.password) {
            //  if check is done
            if( !user.User.find({ login: userData.login }).length && !user.User.find({email: userData.email}).length ) {
              var newUser = new user.User(userData.login, userData.email, userData.password);
              // save function for user
              newUser.save();
            }
          } else {
            console.log('Wrong Password!');
          }
        } else {
          console.log('Wrong Email!');
        }
      } else {
        console.log('Wrong Login!');
      }

      // delete function for user
      // newUser.delete();
    });
    res.write('All good');
  };
};

// Check login data, and confirm if user exists or reject if user dosent exist

// exports of controllers
exports.signup = signup;
exports.signin = signin;
