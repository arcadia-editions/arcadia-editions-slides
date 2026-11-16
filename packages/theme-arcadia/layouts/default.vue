<script setup lang="ts">
import ThemeFrame from '../components/ThemeFrame.vue'
const props = defineProps<{ frontmatter?: { title?: string; titleAccent?: string } }>()
</script>
<template>
  <ThemeFrame :title="props.frontmatter?.title || ''" :accent="props.frontmatter?.titleAccent" variant="default"><slot /></ThemeFrame>
</template>
