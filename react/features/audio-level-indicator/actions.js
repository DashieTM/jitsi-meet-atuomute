import type { Dispatch } from 'redux';
import { updateSettings } from '../base/settings';

import { SET_AUDIO_LEVEL } from './actionTypes';
import logger from './logger';

/**
 * Sets the new audio level
 *
 * @param {number} newLevel - audiolevel.
 *
 * @returns {void}
 */
export function setAudioLevel( newLevel: number ) {
        dispatch(updateSettings({ audioLevel: newLevel }));
}


        