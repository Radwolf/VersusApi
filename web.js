var express = require("express"), 
	app = express(), 
	http = require("http"),
	dateUtils = require("date-utils"),
//	dateHelper = require("./helpers/dateHelper"),
	server = http.createServer(app);
var mongoose = require("mongoose"); 

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
		|| 'mongodb://localhost/versusapi';

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);
	}
});

// Llamadas REST para la API
aficion = require('./routes/aficion')(app);
encuentro = require('./routes/encuentro')(app);
//lista = require('./routes/lista')(app);
//categoria = require('./routes/categoria')(app);

