<script setup lang="ts">
import ThemeFrame from '../components/ThemeFrame.vue'
const props = defineProps<{ frontmatter?: { title?: string } }>()
</script>
<template>
  <ThemeFrame :title="props.frontmatter?.title || ''" variant="two-columns">
    <div class="iv-columns"><div><slot name="left" /></div><div><slot name="right" /></div></div>
  </ThemeFrame>
</template>
