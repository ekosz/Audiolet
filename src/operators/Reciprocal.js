/**
 * @depends ../core/AudioletNode.js
 */

var Reciprocal = new Class({
    Extends: AudioletNode,
    initialize: function(audiolet, value) {
        AudioletNode.prototype.initialize.apply(this, [audiolet, 1, 1]);
        this.linkNumberOfOutputChannels(0, 0);
    },

    generate: function(inputBuffers, outputBuffers) {
        var inputBuffer = inputBuffers[0];
        var outputBuffer = outputBuffers[0];

        if (inputBuffer.isEmpty) {
            outputBuffer.isEmpty = true;
            return;
        }

        var numberOfChannels = inputBuffer.numberOfChannels;
        for (var i = 0; i < numberOfChannels; i++) {
            var inputChannel = inputBuffer.getChannelData(i);
            var outputChannel = outputBuffer.getChannelData(i);
            var bufferLength = inputBuffer.length;
            for (var j = 0; j < bufferLength; j++) {
                outputChannel[j] = 1 / inputChannel[j];
            }
        }
    },

    toString: function() {
        return 'Reciprocal';
    }
});

