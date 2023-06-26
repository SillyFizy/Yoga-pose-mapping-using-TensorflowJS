<template>
  <div>
    <div class="flex flex-col w-full h-[80vh] justify-center items-center font-bold">
      <div class="flex w-1/2 h-48 gap-2 ">
        <img src="@/assets/HomeViewPose1.webp" alt="" class="rounded-3xl w-1/4 h-full">
        <img src="@/assets/HomeViewPose2.webp" alt="" class="rounded-3xl w-1/4 h-full">
        <img src="@/assets/HomeViewPose3.png" alt="" class="rounded-3xl w-1/4 h-full">
        <img src="@/assets/HomeViewPose4.jpg" alt="" class="rounded-3xl w-1/4 h-full">
      </div>
      <div class="flex text-4xl flex-col justify-center items-center m-4">
        <h2 class="">Welcome to</h2>
        <div class="flex">
          <h1 class="text-slate-800">POSE</h1>
          <h1 class="text-rose-600">SENSE</h1>
        </div>
      </div>
      <p class="text-xl font-normal w-1/4 text-center">Elevate your yoga practice with Pose Sense! Perfect your poses, unlock your potential, and ignite your passion for yoga. Get expert guidance, personalized feedback, and join a vibrant community. Discover the joy of flawless poses with Pose Sense.</p>
      <router-link :to="{name:'Pose'}">
        <Button class="my-4">Get Started</Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";

</script>
