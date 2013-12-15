var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var encuentroSchema = new Schema({
  retador:	{ type: String, required: true },
  retado:	{ type: String},
  actividad:{ type: Number, required:true },
  ubicacion:{ type: Number, required:true },
  resultado:{ type: String}
});

module.exports = mongoose.model('Encuentro', encuentroSchema);

