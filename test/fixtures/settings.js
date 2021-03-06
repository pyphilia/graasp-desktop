import {
  DEFAULT_LANGUAGE,
  DEFAULT_DEVELOPER_MODE,
  DEFAULT_GEOLOCATION_ENABLED,
  SYNC_MODES,
  DEFAULT_SYNC_MODE,
} from '../../src/config/constants';
import { USER_ALICE, USER_GRAASP, USER_CEDRIC } from './users';

/* eslint-disable-next-line import/prefer-default-export */
export const settingsPerUser = {
  [USER_GRAASP.name]: {
    lang: DEFAULT_LANGUAGE,
    developerMode: DEFAULT_DEVELOPER_MODE,
    geolocationEnabled: DEFAULT_GEOLOCATION_ENABLED,
    syncMode: DEFAULT_SYNC_MODE,
  },
  [USER_ALICE.name]: {
    lang: 'fr',
    developerMode: DEFAULT_DEVELOPER_MODE,
    geolocationEnabled: true,
    syncMode: SYNC_MODES.ADVANCED,
  },
  [USER_CEDRIC.name]: {
    lang: 'ja',
    developerMode: true,
    geolocationEnabled: DEFAULT_GEOLOCATION_ENABLED,
    syncMode: SYNC_MODES.VISUAL,
  },
};
