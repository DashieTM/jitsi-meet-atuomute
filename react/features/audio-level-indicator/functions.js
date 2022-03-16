

/**
 * Gets the AudioLevel.
 *
 * @param {Object} state - Redux state.
 * @returns {number}
 */
 export function getAudioLevel(state: Object) {
    return state['features/audio-level-indicator'].audioLevel;
}
