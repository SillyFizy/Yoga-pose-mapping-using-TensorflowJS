<template>
  <div>
    <div class="flex flex-col justify-center items-center relative">
      <div class="relative">
        <img src="" alt="">
        <input type="file" ref="uploadedImg" @change="onFileSelected">
        <div v-for="keypoint in keyPoints" :key="keyPoints.indexOf(keypoint)"
             class="bg-white rounded-full w-2 h-2 absolute"
             :style="{top: keypoint[0] * squarifiedBbox.width+squarifiedBbox.y+'px', left: keypoint[1] *squarifiedBbox.height+squarifiedBbox.x+'px'}"></div>
        <Highlighter @squarifiedBbox="estimatePose" v-for="object in objects" :object="object"
                     :key="objects.indexOf(object)"></Highlighter>
        <Button @click="DetectPerson">Detect</Button>
      </div>
    </div>
  </div>
</template>

<script setup>

import Button from "../components/Button.vue";
import Highlighter from "../components/Highlighter.vue";
//imports
import * as tf from '@tensorflow/tfjs';
import {cocoSSDModel} from "/AIModels/CocoSSDModel.js";
import {poseEstimate} from "/AIModels/PoseEstimate.js";
import {ref} from "vue";
import Swal from "sweetalert2";


//references
const img = ref();
const isPerson = ref([])
const uploadedImg = ref([]);
const isDragging = ref(false);
const objects = ref([]);
const keyPoints = ref([]);
const squarifiedBbox = ref({
  x: null,
  y: null,
  width: null,
  height: null
});


//methods
const onFileSelected = (event) => {
  const files = event.target.files[0];
  if (files.length === 0)
    return;
  else {
    uploadedImg.value = URL.createObjectURL(files)
    console.log(uploadedImg.value)
  }
}
const DetectPerson = async () => {
  const imgElem = img.value;
  isPerson.value = await cocoSSDModel.detect(imgElem);
  const person = isPerson.value.find(p => p.class === 'person');
  if (person) {
    objects.value = isPerson.value;
  } else {
    Swal.fire({
      title: 'Something went wrong!',
      text: "Please make sure you have uploaded a valid image.",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Try again'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    })
  }
};
const estimatePose = async (bbox) => {
  squarifiedBbox.value = bbox;
  let results = tf.tidy(function () {
    let imgTensor = tf.browser.fromPixels(img.value);
    let cropStartPoint = [bbox.y, bbox.x, 0];
    let cropSize = [bbox.width, bbox.height, 3];
    let croppedImg = tf.slice(imgTensor, cropStartPoint, cropSize);
    let resizedImg = tf.image.resizeBilinear(croppedImg, [192, 192], true).toInt();
    return poseEstimate.predict(tf.expandDims(resizedImg));

  })
  let outputArray = await results.array()
  results.dispose()
  keyPoints.value = outputArray[0][0]
};
</script>