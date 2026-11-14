<script setup lang="ts">
import ThemeFrame from '../components/ThemeFrame.vue'
const props = defineProps<{ frontmatter?: { title?: string } }>()
</script>
<template>
  <ThemeFrame :title="props.frontmatter?.title || ''" variant="cover"><slot /></ThemeFrame>
</template>
