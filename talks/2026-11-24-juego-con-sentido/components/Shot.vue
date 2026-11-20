<script setup lang="ts">
// Screenshot with placeholder fallback: if `src` is missing or fails to load, shows a dashed box with the TODO text.
import { ref } from 'vue'
const props = defineProps<{ src?: string; todo: string; h?: string }>()
const broken = ref(!props.src)
// Runtime string src isn't rewritten by Vite: prefix the build base (e.g. GitHub Pages /repo/talk/).
const url = props.src?.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + props.src : props.src
</script>

<template>
  <img v-if="!broken" :src="url" :alt="props.todo" class="shot" :style="{ maxHeight: props.h || '380px' }" @error="broken = true" />
  <div v-else class="shot-todo" :style="{ height: props.h || '380px' }">TODO · {{ props.todo }}</div>
</template>

<style scoped>
.shot { display: block; margin: 0 auto; max-width: 100%; object-fit: contain; }
.shot-todo {
  display: flex; align-items: center; justify-content: center; text-align: center;
  border: 2px dashed #9aa5b1; border-radius: 8px; color: #6b7785; padding: 1rem;
  font-size: 0.9rem;
}
</style>
