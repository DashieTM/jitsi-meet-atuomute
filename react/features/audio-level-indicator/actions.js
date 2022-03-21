
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
        return {
                type: SET_AUDIO_LEVEL,
                audioLevel: newLevel
        };
}


        