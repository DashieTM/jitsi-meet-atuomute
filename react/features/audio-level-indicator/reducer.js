// @flow

import { ReducerRegistry } from '../base/redux';

import { SET_AUDIO_LEVEL } from './actionTypes';


const DEFAULT_STATE = {
};

ReducerRegistry.register('features/audio-level-indicator', (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case SET_AUDIO_LEVEL:
        return {
            ...state,
        };
    default:
        return state;
    }
});
