/* @flow */

import React, { Component } from 'react';
import { PureComponent } from 'react';
import { getAudioLevel } from '../../base/settings';
import { setAudioLevel } from '../actions';
import { dockToolbox } from '../../toolbox/actions.web';
import { connect } from '../../base/redux';

/**
 * The number of dots to display in AudioLevelIndicator.
 *
 * IMPORTANT: AudioLevelIndicator assumes that this is an odd number.
 */
const AUDIO_LEVEL_DOTS = 5;

/**
 * The index of the dot that is at the direct middle of all other dots.
 */
const CENTER_DOT_INDEX = Math.floor(AUDIO_LEVEL_DOTS / 2);

/**
 * The type of the React {@link PureComponent} props of {@link AudioLevelIndicator}.
 */
export type Props = {

    /**
     * The current audio level to display. The value should be a number between
     * 0 and 1.
     */
    _audioLevel: number,

     /**
     * Sets the new Audio level.
     */
    _setAudioLevel: Function,
};

/*this.state = {
    audioLevel: typeof passedAudioLevel === 'number' && !isNaN(passedAudioLevel)
    ? Math.min(passedAudioLevel * 1.2, 1) : 0
};*/

/**
 * Creates a ReactElement responsible for drawing audio levels.
 *
 * @augments {Component}
 */
class AudioLevelIndicator extends PureComponent<Props> {
   /**
     * Initializes a new instance of AbstractVideoManager.
     *
     * @returns {void}
     */
    constructor() {
        super();
    }

  
    /**
     * Implements React's {@link PureComponent#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _audioLevel, _setAudioLevel } = this.props;

        // First make sure we are sensitive enough.
        const audioLevel = typeof _audioLevel === 'number' && !isNaN(_audioLevel)
            ? Math.min(_audioLevel * 1.2, 1) : 0;

        _setAudioLevel(audioLevel);

        // Let's now stretch the audio level over the number of dots we have.
        const stretchedAudioLevel = AUDIO_LEVEL_DOTS * audioLevel;

        const audioLevelDots = [];

        for (let i = 0; i < AUDIO_LEVEL_DOTS; i++) {
            const distanceFromCenter = CENTER_DOT_INDEX - i;
            const audioLevelFromCenter
                = stretchedAudioLevel - Math.abs(distanceFromCenter);
            const cappedOpacity = Math.min(
                1, Math.max(0, audioLevelFromCenter));
            let className;

            if (distanceFromCenter === 0) {
                className = 'audiodot-middle';
            } else if (distanceFromCenter < 0) {
                className = 'audiodot-top';
            } else {
                className = 'audiodot-bottom';
            }

            audioLevelDots.push(
                <span
                    className = { className }
                    key = { i }
                    style = {{ opacity: cappedOpacity }} />
            );
        }

        return (
            <span className = 'audioindicator in-react'>
                { audioLevelDots }
            </span>
        );
    }
}

/**
* Maps part of the Redux store to the props of this component.
*
* @param {Object} state - The Redux state.
* @returns {Props}
*/
export function _mapStateToProps(state: Object): $Shape<Props> {

    return {
        _audioLevel: getAudioLevel(state)
    };
}


const _mapDispatchToProps = (dispatch, ownProps) => {
    return {
        _setAudioLevel: () => setAudioLevel(ownProps._audioLevel)
    }
}

export default connect(_mapStateToProps , _mapDispatchToProps)(AudioLevelIndicator);