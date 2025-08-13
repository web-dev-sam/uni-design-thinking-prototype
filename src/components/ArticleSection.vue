<template>
  <div v-if="section.type === 'text'">
    <p class="mt-5 text-justify">
      {{ section.text }}
    </p>
  </div>
  <div v-else-if="section.type === 'image'">
    <img :src="section.path" class="my-10 mx-auto" />
  </div>
  <div v-else-if="section.type === 'literature' && section.literature.length > 0">
    <h2 class="h2 uppercase text-left mt-5">Literatur</h2>
    <ul class="list-disc list-inside mt-2 text-left">
      <li v-for="literature in section.literature" :key="literature.text">
        <a
          class="underline"
          :href="literature.link ?? '#'"
          :class="literature.link ? 'underline' : 'no-underline pointer-events-none'"
          target="_blank"
        >
          {{ literature.text }}
        </a>
      </li>
    </ul>
  </div>
  <div v-else-if="section.type === 'links' && section.links.length > 0">
    <h2 class="h2 uppercase text-left mt-5">Links</h2>
    <ul class="list-disc list-inside mt-2 text-left">
      <li v-for="link in section.links" :key="link.text">
        <a
          class="underline"
          :href="link.link ?? '#'"
          :class="link.link ? 'underline' : 'no-underline pointer-events-none'"
          target="_blank"
        >
          {{ link.text }} </a
        ><i class="fa-solid fa-square-up-right ml-2"></i>
      </li>
    </ul>
  </div>
  <div v-else-if="section.type === 'quiz'">
    <section class="relative my-10">
      <img src="@/assets/dashed-border.svg" class="w-full h-full absolute -z-10" />
      <div class="px-12 py-14 text-left">
        <h2 class="h2 uppercase">{{ section.title }}</h2>
        <p class="mt-5">
          {{ section.description }}
        </p>
        <button class="float-right mt-5">Start <i class="fa-solid fa-play ml-2"></i></button>
        <div class="clear-both"></div>
      </div>
    </section>
  </div>
  <div v-else-if="section.type === 'lab'">
    <section class="relative my-10 mt-10">
      <img src="@/assets/dashed-border.svg" class="w-full absolute -z-10 h-full" />
      <div class="px-12 py-14 text-left">
        <h2 class="h2 uppercase">{{ section.title }}</h2>
        <p class="mt-5">
          {{ section.description }}
        </p>
        <p class="font-gradient-cta mt-5 font-black" role="button">
          <i class="fa-solid fa-play mr-2 mt-5"></i> Hinweise
        </p>
      </div>
    </section>
  </div>
  <h2 v-else-if="section.type === 'section-header'" :id="section.id" class="h2 text-left mt-10">
    {{ section.title }}
  </h2>
  <ul v-else-if="section.type === 'list'" class="text-left list-disc ml-10 my-5">
    <li v-for="item in section.items" :key="item.text" class="mt-5" v-html="item.text"></li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    section: Object,
  },
})
export default class ArticleSection extends Vue {}
</script>
