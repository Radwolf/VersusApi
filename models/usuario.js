var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
  _id:    	{ type: String, required: true },
  fechaAlta:{ type: Date, default: Date.now },
  listas: 	[{ type: Schema.Types.ObjectId, ref: 'Lista' }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);

