<template>
  <div>
    <div class="flex flex-col justify-center items-center relative">
      <div class="relative flex flex-col items-center justify-center">
<!--        <input ref="fileInput" type="file" accept="image/*" @change="onFileSelected">-->
        <img ref="img" src="../assets/test1.webp" alt="" width="720" height="480">
        <div v-for="keypoint in keyPoints" :key="keyPoints.indexOf(keypoint)"
             class="bg-[#0fffcb] rounded-full w-2 h-2 absolute"
             :style="{top: keypoint[0] * squarifiedBbox.width+squarifiedBbox.y+'px', left: keypoint[1] *squarifiedBbox.height+squarifiedBbox.x+'px'}"></div>
        <Highlighter @squarifiedBbox="estimatePose" v-for="object in objects" :object="object"
                     :key="objects.indexOf(object)"></Highlighter>
        <Button @click="DetectPerson">Detect</Button>
      </div>
    </div>
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-3xl text-white">Here are some example poses you can try</h1>
      <div class="flex justify-center gap-2 mt-4">
        <img src="../assets/example-pose1.png" class="rounded-2xl w-1/6 h-full" alt="Example Pose 1">
        <img src="../assets/example-pose2.png" class="rounded-2xl w-1/6 h-full" alt="Example Pose 2">
        <img src="../assets/example-pose3.png" class="rounded-2xl w-1/6 h-full" alt="Example Pose 3">
        <img src="../assets/example-pose4.png" class="rounded-2xl w-1/6 h-full" alt="Example Pose 4">
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
import {computed, ref} from "vue";
import Swal from "sweetalert2";


//references
const img = ref();
const fileInput = ref();
const isPerson = ref([])
const uploadedImg = ref();
const objects = ref([]);
const keyPoints = ref([]);
const squarifiedBbox = ref({
  x: null,
  y: null,
  width: null,
  height: null
});


//methods
// const onFileSelected = (event) => {
//   let input = fileInput.value
//   let file = input.files;
//   if(file && file[0]){
//     let reader = new FileReader();
//     reader.onload = e =>{
//       uploadedImg.value = e.target.result;
//       console.log(uploadedImg.value)
//     }
//     reader.readAsDataURL(file[0])
//   }
// }
// const imgURL = computed(()=>{
//   if(uploadedImg.value){
//     return img.value = URL.createObjectURL(dataURLtoBlob(uploadedImg.value))
//   }
//   return null;
// })
function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
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