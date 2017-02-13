// check if user is logged in
function signedIn(req,res) {
  if( req.session.has('userid') ) return true;
  else return false;
}

exports.signedIn = signedIn;
