import type { Dispatch } from 'redux';

import { SET_AUDIO_LEVEL } from './actionTypes';
import logger from './logger';

/**
 * Sets the new audio level
 *
 * @param {number} audioLevel - audiolevel.
 *
 * @returns {{
 *     type: SET_AUDIO_LEVEL,
 *     audioLevel: number,
 * }}
 */
export function setAudioLevel( audioLevel ) {
    return {
        type: SET_AUDIO_LEVEL,
        audioLevel,
    };
}
