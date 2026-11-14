<script setup lang="ts">
import logo from '../assets/asyncapi-mark.png'

defineProps<{ title: string; variant?: string }>()
</script>

<template>
  <div class="slidev-layout ivangsa" :class="variant">
    <header class="iv-header">
      <img class="iv-logo" :src="logo" alt="AsyncAPI" />
      <div class="iv-header-title">{{ title }}</div>
    </header>
    <main class="iv-body"><slot /></main>
  </div>
</template>
