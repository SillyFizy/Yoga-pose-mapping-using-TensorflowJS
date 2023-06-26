<template>
  <div class="absolute bg-opacity-25 border border-amber-600"
       :style="{ left: squarifiedBbox.x + 'px', top:squarifiedBbox.y + 'px', width: squarifiedBbox.width + 'px', height: squarifiedBbox.height + 'px' }">
  </div>
</template>

<script setup>
const props = defineProps({
  object: Object,
})
import {defineEmits, onMounted, ref, watch} from "vue";

const emit = defineEmits(['squarifiedBbox'])

let squarifiedBbox;
const calcSquiredBbox = () => {
  const object = props.object;
  const largerSide = Math.max(object.bbox[2], object.bbox[3]);
  const padding = Math.abs(object.bbox[2] - object.bbox[3]) / 2;
  if (object.bbox[2] > object.bbox[3]) {
    squarifiedBbox = {
      x: Math.floor(object.bbox[0]),
      y: Math.floor(object.bbox[1] - padding),
      width: Math.floor(largerSide),
      height: Math.floor(largerSide)
    }
  } else {
    squarifiedBbox = {
      x: Math.floor(object.bbox[0] - padding,),
      y: Math.floor(object.bbox[1]),
      width: Math.floor(largerSide),
      height: Math.floor(largerSide)
    }
  }
  emit('squarifiedBbox', {
    x: squarifiedBbox.x,
    y: squarifiedBbox.y,
    width: squarifiedBbox.width,
    height: squarifiedBbox.height
  })
}
calcSquiredBbox()
</script>
