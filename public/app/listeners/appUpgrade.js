const { autoUpdater } = require('electron-updater');
const logger = require('../logger');
const { GET_APP_UPGRADE_CHANNEL } = require('../config/channels');

const installAppUpgrade = () => async (event, shouldUpgrade) => {
  if (shouldUpgrade) {
    autoUpdater.downloadUpdate();
  }
};

const getAppUpgrade = mainWindow => async () => {
  // app update
  autoUpdater.logger = logger;
  autoUpdater.autoDownload = false;

  autoUpdater.once('update-available', () => {
    logger.debug('update is available');
    mainWindow.webContents.send(GET_APP_UPGRADE_CHANNEL, true);
  });

  autoUpdater.once('update-not-available', () => {
    logger.debug('update is not available');
    mainWindow.webContents.send(GET_APP_UPGRADE_CHANNEL, false);
  });

  autoUpdater.once('update-downloaded', () => {
    const msg = 'Update downloaded';
    logger.debug('message', { msg, hide: false, replaceAll: true });
    autoUpdater.quitAndInstall();
  });

  // noinspection ES6MissingAwait
  autoUpdater
    .checkForUpdates()
    .then()
    .catch(err => logger.error(err));
};

module.exports = { installAppUpgrade, getAppUpgrade };
