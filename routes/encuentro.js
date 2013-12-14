//File: routes/usuario.js
module.exports = function(app) {

  var Encuentro = require('../models/encuentro.js');

  // GET - Return all encuentros in the DB
  findAllEncuentros = function(req, res) {
  	Encuentro.find(function(err, encuentros) {
  		if(!err) {
  			res.send(encuentros);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };
  
  // GET - Return all encuentros in the DB
  findEncuentrosByUsuario = function(req, res) {
  	Encuentro.find({
		retador : req.params.retador
	}).exec(function(err, encuentros) {
		if (err) {
			return handleError(err);
		}
		console.log('Los Encuentros de ' + req.params.retador + ': ', encuentros);
		res.send(encuentros);
	});
  };
  
  // GET - Devuelve el encuentro activo de un retador
  findEncuentroActual = function(req, res) {
	  Encuentro.find({
		  	retador : req.params.retador,
		  	resultado: null
		  }).exec(function(err, encuentros) {
			  if (err) {
				  return handleError(err);
			  }
			  res.send(encuentros);
		  });
  };
  
  // GET - Devuelve los encuentros activos de una actividad
  findEncuentrosActualByActividad = function(req, res) {
	  Encuentro.find({
		  	actividad: req.params.actividad,
		  	resultado: null
		  }).exec(function(err, encuentros) {
			  if (err) {
				  return handleError(err);
			  }
			  res.send(encuentros);
		  });
  };
  
  // POST - Insert a new Usuario in the DB
  addEncuentro = function(req, res, next) {
	  // Obtenemos las variables y las validamos
	  var retador = req.body.retador;
	  var ubicacion = req.body.ubicacion;
	  var actividad = req.body.actividad;
	  
	  // Validemos que nombre
	  if (retador === '' ||
			  ubicacion === '' ||
			  actividad === '' ) {
		  console.log('ERROR: Campos vacios');
		  return res.send('Hay campos vacíos, revisar');
	  }

	  var encuentro = new Encuentro({
		  retador:    	retador,
		  actividad:	actividad,
		  ubicacion:	ubicacion
	  });

	  encuentro.save(function(err) {
		  if(!err) {
			  console.log('Created');
		  } else {
			  console.log('ERROR: ' + err);
		  }
	  });
		  
	  return res.send(encuentro);
  };
  
  // PUT - Actualizamos el encuentro porque el retado acepta el encuentro
  updateEncuentro = function(req, res) {
    Encuentro.findById(req.params.id, function(err, encuentro) {
      encuentro.retado = req.body.retado;

      encuentro.save(function(err) {
        if(!err) {
    	console.log('Updated');
        } else {
    	console.log('ERROR: ' + err);
        }

        res.send(encuentro);
      });
    });
  };
  
  // DELETE - Delete a Encuentro with specified ID
  	deleteEncuentro = function(req, res, next) {
  		var retador = req.params.retador;
  		var id = req.params.id;
    	Encuentro.findById(id, function(err, encuentro) {
			if (err) {
			  console.log(err);
			  return next(err);
			}
	
			if (!encuentro) {
			  return res.send('Invalid ID. (De algún otro lado la sacaste tú...)');
			}
    
    		// Cancelamos el encuentro
			encuentro.remove(onRemoved);
    	});

	    function onRemoved (err) {
	    	return res.redirect('/encuentros/' + retador);
	    }
  };
  
  // Link routes and functions
  app.get('/encuentros', findAllEncuentros);
  app.get('/encuentros/:retador', findEncuentrosByUsuario);
  app.get('/encuentro/:retador', findEncuentroActual);
  app.get('/encuentros/:actividad', findEncuentrosActualByActividad);
  app.post('/encuentro', addEncuentro);
  app.put('/encuentro/:retado', updateEncuentro);
  app.delete('/encuentro/:id/:retador', deleteEncuentro);
  
};