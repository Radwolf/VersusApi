//File: routes/usuario.js
module.exports = function(app) {

  var Usuario = require('../models/usuario.js');

  // GET - Return all usuarios in the DB
  findAllUsuarios = function(req, res) {
  	Usuario.find(function(err, usuarios) {
  		if(!err) {
  			res.send(usuarios);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };
  
  // GET - Return a Usuario with specified ID
  findById = function(req, res) {
    Usuario.findById(req.params.id, function(err, usuario) {
      if(!err) {
        res.send(usuario);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };
  
  // POST - Insert a new Usuario in the DB
  addUsuario = function(req, res, next) {
	  // Obtenemos las variables y las validamos
	  var nombreUsuario = req.body._id || '';
	  var fechaAlta = new Date(req.body.fechaAlta);
	  
	  // Validemos que nombre 
	  if (nombreUsuario === '') {
		  console.log('ERROR: Campos vacios');
		  return res.send('Hay campos vacíos, revisar');
	  }

	  var usuario = new Usuario({
		  _id:    	nombreUsuario,
		  fechaAlta:fechaAlta
	  });

	  usuario.save(function(err) {
		  if(!err) {
			  console.log('Created');
		  } else {
			  console.log('ERROR: ' + err);
		  }
	  });
		  
	  return res.send(usuario);
  };
  
  // PUT - Update a register already exists
  updateUsuario = function(req, res) {
    Usuario.findById(req.params.id, function(err, usuario) {
      usuario.nombreUsuario = req.body.nombreUsuario;
      usuario.fechaAlta    	= req.body.fechaUsuario;

      usuario.save(function(err) {
        if(!err) {
    	console.log('Updated');
        } else {
    	console.log('ERROR: ' + err);
        }

        res.send(usuario);
      });
    });
  };
  
  // DELETE - Delete a Usuario with specified ID
  	deleteUsuario = function(req, res, next) {
  		var id = req.params.id;
    	Usuario.findById(id, function(err, usuario) {
			if (err) {
			  console.log(err);
			  return next(err);
			}
	
			if (!usuario) {
			  return res.send('Invalid ID. (De algún otro lado la sacaste tú...)');
			}
    
    		// Tenemos el producto, eliminemoslo
			usuario.remove(onRemoved);
    	});

	    function onRemoved (err) {
	    	if (err) {
	    		console.log(err);
	    		return next(err);
	    	}
	    	Lista.find({
				usuario : id
			}).exec(function(err, listas) {
				if (err) {
					return handleError(err);
				}
				for (var lista in listas) {
					lista.remove(function(errLista){
						if (errLista) {
				    		console.log(errLista);
				    		return next(errLista);
				    	}
					});
				};
			});
	    	return res.redirect('/usuarios');
	    }
  };
  
  // Link routes and functions
  app.get('/usuarios', findAllUsuarios);
  app.get('/usuario/:id', findById);
  app.post('/usuario', addUsuario);
  app.put('/usuario/:id', updateUsuario);
  app.delete('/usuario/:id', deleteUsuario);
  
};