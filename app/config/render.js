// action that renders a templates
function show(req, res, template) {
  var rendered = mustache.render(fs.readFileSync(`app/templates/${template}.html`).toString(), { title: "HomePage"} );
  res.write( rendered );
};
exports.show = show;
