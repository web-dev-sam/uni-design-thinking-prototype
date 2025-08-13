<template>
  <section class="mt-10 text-left" :class="nested ? 'ml-12' : ''">
    <div class="grid lg:grid-cols-[80px_auto_auto_50px] grid-cols-[80px_auto_50px] gap-x-5">
      <div class="profile-img row-span-2">
        <img :src="profilepic" />
      </div>
      <h2 class="h3">{{ name }}</h2>
      <h3 class="h3 text-right leading-[52px] hidden lg:block">{{ role }}</h3>
      <i
        class="fa-solid fa-reply h1 leading-[80px] row-span-2 font-gradient-cta text-center overflow-visible"
        role="button"
      ></i>
      <p class="uppercase">{{ area }}</p>
      <time class="text-right hidden uppercase lg:block">{{ time }}</time>
    </div>
    <p class="mt-5">
      {{ message }}
    </p>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    nested: Boolean,
    name: String,
    profilepic: String,
    area: String,
    role: String,
    time: String,
    message: String,
  },
})
export default class Comment extends Vue {}
</script>
