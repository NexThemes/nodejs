// Control website route URLs
var routes = [
  { url: "/",          action: (req,res) => { render.show(req,res,'index') } },
  { url: "/signup",    action: (req,res) => { usercontroller.signup(req,res) } },
  { url: "/signin",    action: (req,res) => { usercontroller.signin(req,res) } },
  { url: "/profile",   action: (req,res) => { if(!is.signedIn(req,res)) {res.setHeader("Location", "/signin"); } } },
  { url: "/signout",   action: (req,res) => { render.show(req,res,'signout') } },

  // { url: "/todo-list", action: null },
  // { url: "/task",      action: null }
];

// browser -> url -> finds in routes -> action()
function execute(req,res) {
  routes.forEach((route) => {
    // checking if the route url is the same as the user URL
    if( req.url == route.url ){
      // pass req & res -> action()
      route.action(req,res);
    }
  });
  // end the response
  res.end(); // needed to stop the browser waiting
};

///////////////////// Export global
exports.execute = execute;
