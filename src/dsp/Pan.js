/**
 * @depends ../core/AudioletNode.js
 */

var Pan = new Class({
    Extends: AudioletNode,
    initialize: function(audiolet) {
        AudioletNode.prototype.initialize.apply(this, [audiolet, 2, 1]);
        // Hardcode two output channels
        this.setNumberOfOutputChannels(0, 2);
        this.pan = new AudioletParameter(this, 1, 0.5);
    },

    generate: function(inputBuffers, outputBuffers) {
        var inputBuffer = inputBuffers[0];
        var outputBuffer = outputBuffers[0];

        if (inputBuffer.isEmpty) {
            outputBuffer.isEmpty = true;
            return;
        }

        var inputChannel = inputBuffer.getChannelData(0);
        var leftOutputChannel = outputBuffer.getChannelData(0);
        var rightOutputChannel = outputBuffer.getChannelData(1);

        // Local processing variables
        var panParameter = this.pan;
        var pan, panChannel;
        if (panParameter.isStatic()) {
            pan = panParameter.getValue();
        }
        else {
            panChannel = panParameter.getChannel();
        }

        var bufferLength = outputBuffer.length;
        for (var i = 0; i < bufferLength; i++) {
            if (panChannel) {
                pan = panChannel[i];
            }
            var scaledPan = pan * Math.PI / 2;
            var value = inputChannel[i];
            // TODO: Use sine/cos tables?
            leftOutputChannel[i] = value * Math.cos(scaledPan);
            rightOutputChannel[i] = value * Math.sin(scaledPan);
        }
    },

    toString: function() {
        return 'Stereo Panner';
    }
});
