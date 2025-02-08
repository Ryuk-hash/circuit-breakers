const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
  isMaintenance: Boolean,
  maintenanceInfo: {
    message: String,
    completesOn: Date,
  },
  isUserServiceEnabled: Boolean,
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
