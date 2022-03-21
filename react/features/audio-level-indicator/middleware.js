// @flow
import _ from 'lodash';

import { MiddlewareRegistry } from '../base/redux';

import { SET_AUDIO_LEVEL } from './actionTypes';
import { setAudioLevel } from './actions';


/**
 * The middleware of the feature base/settings. Distributes changes to the state
 * of base/settings to the states of other features computed from the state of
 * base/settings.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const result = next(action);

    switch (action.type) {
    case SET_AUDIO_LEVEL:
        _setMiddleAudioLevel(store);
        break;
    }
    

    return result;
});

/**
 * Sets the new audio level
 *
 * @param {Store} store - audiolevel.
 * @param {number} action - The dispatched action
 * @returns {void}
 */
 function _setMiddleAudioLevel( {dispatch} , action) {
    //dispatch(setAudioLevel(action));
 }

