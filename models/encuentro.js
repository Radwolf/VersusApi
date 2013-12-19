var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var encuentroSchema = new Schema({
  retador:	{ type: String, required: true },
  retado:	{ type: String},
  actividad:{ type: String, required:true },
  longitud :{ type: String, required:true },
  latitud  :{ type: String, required:true },
  ubicacion:{ type: String},
  resultado:{ type: String}
});

module.exports = mongoose.model('Encuentro', encuentroSchema);

