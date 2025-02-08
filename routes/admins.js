const express = require('express');
const { pubClient } = require('../utils/redis');
const Maintenance = require('../models/maintenance');

const router = express.Router();

router.patch('/maintenance', async (req, res) => {
  try {
    const updateObj = {};

    if ('isMaintenance' in req.body) updateObj.isMaintenance = req.body.isMaintenance;
    if ('maintenanceInfo' in req.body) updateObj.maintenanceInfo = req.body.maintenanceInfo;
    if ('isUserServiceEnabled' in req.body) updateObj.isUserServiceEnabled = req.body.isUserServiceEnabled;

    const updatedMaintenance = await Maintenance.findOneAndUpdate({}, updateObj, {
      new: true,
      upsert: true,
      lean: true,
    });

    await pubClient.publish('CONFIG_UPDATE', JSON.stringify(updatedMaintenance));

    return res.status(200).json({
      success: true,
      message: 'Updated maintenance.',
      data: { maintenance: updatedMaintenance },
    });
  } catch (error) {
    console.error('Error updating maintenance:', error);

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

module.exports = router;
