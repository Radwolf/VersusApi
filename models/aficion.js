var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var aficionSchema = new Schema({
  usuario:	{ type: String, required: true },
  actividad:{ type: String, required: true }
});

module.exports = mongoose.model('Aficion', aficionSchema);

