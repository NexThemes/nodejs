/// User Logic

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
      data = decodeURIComponent ( data.toString() );
      console.log((data.split('&'))); // 1) HomeWork separate by = to : and make it as a object // 2) Same but 2 fields for the sign in ?? 3) with FS.file check registered user
    });
    res.write('All good');
  }

}

// register a user
function create_account(req, res){

}

// exports of controllers
exports.signup = signup;
