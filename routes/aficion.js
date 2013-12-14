//File: routes/usuario.js
module.exports = function(app) {

  var Aficion = require('../models/aficion.js');

  // GET - Return all aficiones in the DB
  findAllAficiones = function(req, res) {
  	Aficion.find(function(err, aficiones) {
  		if(!err) {
  			res.send(aficiones);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };
  
  // GET - Return all aficiones in the DB
  findAficionesByUsuario = function(req, res) {
  	Aficion.find({
		usuario : req.params.usuario
	}).exec(function(err, aficiones) {
		if (err) {
			return handleError(err);
		}
		console.log('Las Aficiones de ' + req.params.usuario + ': ', aficiones);
		res.send(aficiones);
	});
  };
  
  // GET - Return a Usuario with specified ID
  findAficion = function(req, res) {
    Aficion.findById(req.params.id, function(err, aficion) {
      if(!err) {
        res.send(aficion);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };
  
  // POST - Insert a new Usuario in the DB
  addAficion = function(req, res, next) {
	  // Obtenemos las variables y las validamos
	  var usuario = req.body.usuario;
	  var actividad = req.body.actividad;
	  
	  // Validemos que nombre 
	  if (nombreUsuario === '' ||
			  actividad === '' ) {
		  console.log('ERROR: Campos vacios');
		  return res.send('Hay campos vacíos, revisar');
	  }

	  var aficion = new Aficion({
		  usuario:    	usuario,
		  actividad:	actividad
	  });

	  aficion.save(function(err) {
		  if(!err) {
			  console.log('Created');
		  } else {
			  console.log('ERROR: ' + err);
		  }
	  });
		  
	  return res.send(usuario);
  };
  
  // DELETE - Delete a Aficion with specified ID
  	deleteAficion = function(req, res, next) {
  		var pUsuario = req.params.usuario;
  		var pActividad = req.params.actividad;
  		Aficion.find({
  			usuario : pUsuario,
  			actividad:pActividad
  		}).exec(function(err, aficion) {
			if (err) {
			  console.log(err);
			  return next(err);
			}
	
			if (!aficion) {
			  return res.send('Invalid ID. (De algún otro lado la sacaste tú...)');
			}
    
    		// Tenemos la aficion, eliminemoslo
			aficion.remove(onRemoved);
    	});

	    function onRemoved (err) {
	    	return res.redirect('/aficiones/' + pUsuario);
	    }
  };
  
  // Link routes and functions
  app.get('/aficiones', findAllAficiones);
  app.get('/aficiones/:usuario', findAficionesByUsuario);
  app.get('/aficion/:usuario/:actividad', findAficion);
  app.post('/aficion', addAficion);
  app.delete('/aficion/:usuario/:actividad', deleteAficion);
  
};