// main web app file
require('./app/config/bootstrap.js');
// start the server
http.createServer((req,res)=>{
      // pass request and response
      var session = new NodeSession({secret: 'D3qf9GYL6CJ0NLFgGjiG'});
      session.startSession(req, res, ()=>{
        router.execute( req, res );
      });
    })
    .listen(3000,'localhost',()=>{
      console.log('Server Start!');
});

/// FRAMEWORKS <---------------->
  /// ROUTER      -> controls URLs
  /// CONTROLLER  -> logic
  /// MODEL       -> DATA
  /// VIEW        -> template
/// www.nodeframework.com

// create login and register form
