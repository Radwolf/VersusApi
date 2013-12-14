var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var aficionSchema = new Schema({
  _id:    	{ type: String, required: true },
  usuario:	{ type: String, required: true },
  actividad:{ type: Number, required:true }
});

module.exports = mongoose.model('Aficion', aficionSchema);

