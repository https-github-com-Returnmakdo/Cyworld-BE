const schedule = require('node-schedule');
const { Users } = require('../models');
const logger = require('../util/logger');

module.exports = {
  myHomeCountSchedule: async () => {
    try {
      schedule.scheduleJob('*/1 * * * *', async () => {
        const users = await Users.findAll();
        await users.update({ today: 0 }, { where: { userId: users.userId } });
      });
    } catch (err) {
      logger.error(err);
    }
  },
};
