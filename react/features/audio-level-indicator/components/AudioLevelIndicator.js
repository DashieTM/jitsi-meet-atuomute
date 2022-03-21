/* @flow */

import React, { Component } from 'react';
import { PureComponent } from 'react';
import { setAudioLevel } from '../actions';
import { connect } from '../../base/redux';
import { getAudioLevel, getUserSelectedMicDeviceId } from '../../base/settings/functions.any';
import { RnnoiseProcessor } from '../../stream-effects/rnnoise';


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

    _processor: RnnoiseProcessor
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


    spass(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
        
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            console.log(Math.round(average));
            // colorPids(average);
        };
    }

  
    /**
     * Implements React's {@link PureComponent#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _audioLevel, _setAudioLevel , _processor} = this.props;

        const processor = _processor();

        // First make sure we are sensitive enough.
        const audioLevel = typeof _audioLevel === 'number' && !isNaN(_audioLevel)
            ? Math.min(_audioLevel * 1.2, 1) : 0;

        //console.log(_audioLevel);
        //processor.then(value => value._convertTo16BitPCM(value._wasmPcmInputF32Index));
        processor.then(value => this.props._setAudioLevel(value._wasmInterface._rnnoise_process_frame(value._context, value._wasmPcmOutput, value._wasmPcmInput)));
        console.log(processor);
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
        //_audioLevel: getAudioLevel(state),
        _device: getUserSelectedMicDeviceId(state),
        _processor: APP.conference._getConferenceOptions().createVADProcessor
    };
}


const _mapDispatchToProps = (dispatch, ownProps) => {
    return {
        _setAudioLevel: (e) => dispatch(setAudioLevel(e))
    }
}

export default connect(_mapStateToProps , _mapDispatchToProps)(AudioLevelIndicator);
