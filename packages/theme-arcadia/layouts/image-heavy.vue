<script setup lang="ts">
import ThemeFrame from '../components/ThemeFrame.vue'
const props = defineProps<{ frontmatter?: { title?: string } }>()
</script>
<template>
  <ThemeFrame :title="props.frontmatter?.title || ''" variant="image-heavy">
    <div class="iv-image-grid"><div><slot name="text" /></div><div><slot name="image" /></div></div>
  </ThemeFrame>
</template>
