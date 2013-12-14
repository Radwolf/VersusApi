var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var encuentroSchema = new Schema({
  _id:    	{ type: String, required: true },
  retador:	{ type: String, required: true },
  retado:	{ type: String},
  actividad:{ type: Number, required:true },
  ubicacion:{ type: Number, required:true },
  resultado:{ type: Number}
});

module.exports = mongoose.model('Encuentro', encuentroSchema);

