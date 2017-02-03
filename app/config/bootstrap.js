// Start all the needed files and libs

// include modules

// core modules
global.http     = require('http');
global.fs       = require('fs');
global.mustache = require('mustache');
// custom modules
// global.render   = require('./render.js');
// global.router   = require('./router.js')


//Homework scan config/, controllers/, models/
fs.readdir('./app', {}, (err, subdir)=>{
  if(err){
    console.log("Directory not found!");
  }
  subdir.forEach((dir, index)=>{
    if(dir == 'templates') return;
    fs.readdir(`./app/${dir}`,{},(err, files)=>{
      if(err){
        return console.error('Cannot find Subdirectory');
      }
      files.forEach((module)=>{
        if(module == 'bootstrap.js') return;
        global[module.replace('.js','').replace('.','_')] = require(`../../app/${dir}/${module}`);
      });
    });
  });
});
