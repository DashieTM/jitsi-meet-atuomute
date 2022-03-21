// @flow

import { PersistenceRegistry,ReducerRegistry } from '../base/redux';

import { SET_AUDIO_LEVEL } from './actionTypes';


const DEFAULT_STATE = {
    audioLevel: 0.0
};

const STORE_NAME = 'features/audio-level-indicator'

/**
 * Sets up the persistence of the feature {@code base/settings}.
 */
 const filterSubtree = {};

 // start with the default state
 Object.keys(DEFAULT_STATE).forEach(key => {
     filterSubtree[key] = true;
 });
 
PersistenceRegistry.register(STORE_NAME, filterSubtree, DEFAULT_STATE);

ReducerRegistry.register(STORE_NAME, (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case SET_AUDIO_LEVEL:
        return {
            audioLevel: action.audioLevel
        };
    default:
        return state;
    }
});
