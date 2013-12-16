var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var encuentroSchema = new Schema({
  retador:	{ type: String, required: true },
  retado:	{ type: String},
  actividad:{ type: String, required:true },
  longitud :{ type: Number, required:true },
  latitud  :{ type: Number, required:true },
  resultado:{ type: String}
});

module.exports = mongoose.model('Encuentro', encuentroSchema);

