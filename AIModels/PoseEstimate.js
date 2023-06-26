import * as tf from '@tensorflow/tfjs';

let poseEstimate = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/movenet/singlepose/lightning/4', {fromTFHub: true})

export {poseEstimate}

