// this file needs to use module.exports as it is used both by react and electron
// make sure this file is identical in both src/config and app/config

const ERROR_ZIP_CORRUPTED = 'ERROR_ZIP_CORRUPTED';
const ERROR_JSON_CORRUPTED = 'ERROR_JSON_CORRUPTED';
const ERROR_SPACE_ALREADY_AVAILABLE = 'ERROR_SPACE_ALREADY_AVAILABLE';
const ERROR_DOWNLOADING_FILE = 'ERROR_DOWNLOADING_FILE';
const ERROR_GENERAL = 'ERROR_GENERAL';
const ERROR_DUPLICATE_CLASSROOM_NAME = 'ERROR_DUPLICATE_CLASSROOM_NAME';
const ERROR_ACCESS_DENIED_CLASSROOM = 'ERROR_ACCESS_DENIED_CLASSROOM';
const ERROR_DUPLICATE_USERNAME_IN_CLASSROOM =
  'ERROR_DUPLICATE_USERNAME_IN_CLASSROOM';

module.exports = {
  ERROR_ZIP_CORRUPTED,
  ERROR_JSON_CORRUPTED,
  ERROR_SPACE_ALREADY_AVAILABLE,
  ERROR_DOWNLOADING_FILE,
  ERROR_GENERAL,
  ERROR_DUPLICATE_CLASSROOM_NAME,
  ERROR_ACCESS_DENIED_CLASSROOM,
  ERROR_DUPLICATE_USERNAME_IN_CLASSROOM,
};
