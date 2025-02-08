const Maintenance = require('../models/maintenance');
const { subClient } = require('../utils/redis');

let maintenanceCache = null;

const initMaintenance = async () => {
  try {
    maintenanceCache = await Maintenance.findOne().lean();
  } catch (error) {
    console.error('Failed to load maintenance config:', error);
  }
};

initMaintenance();

subClient.subscribe('CONFIG_UPDATE', (err, count) => {
  if (err) console.error('❌ Failed to subscribe to CONFIG_UPDATE:', err);
  else console.log(`✅ Subscribed to CONFIG_UPDATE (${count} channels)`);
});

subClient.on('message', (channel, message) => {
  if (channel === 'CONFIG_UPDATE') {
    maintenanceCache = JSON.parse(message);
    console.log('🔄 Maintenance config updated from Redis:', maintenanceCache);
  }
});

const checkMaintenance = async (req, res, next) => {
  try {
    if (maintenanceCache && maintenanceCache.isMaintenance)
      return res.status(503).json({
        success: false,
        message: maintenanceCache.maintenanceInfo?.message || 'The app is under maintenance. Please try again later.',
        data: { completesOn: maintenanceCache.maintenanceInfo?.completesOn || null },
      });

    if (maintenanceCache && req.originalUrl.startsWith('/api/users') && !maintenanceCache?.isUserServiceEnabled)
      return res.status(503).json({
        success: false,
        message: 'User service disabled. Please try again later.',
        data: { isUserServiceEnabled: maintenanceCache?.isUserServiceEnabled },
      });

    req.isUserServiceEnabled = maintenanceCache?.isUserServiceEnabled;
    next();
  } catch (error) {
    console.error('Maintenance Check Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = checkMaintenance;
