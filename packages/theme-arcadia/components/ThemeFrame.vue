<script setup lang="ts">
import logo from '../assets/asyncapi-mark.png'

defineProps<{ title: string; accent?: string; variant?: string }>()
</script>

<template>
  <div class="slidev-layout ivangsa" :class="variant">
    <header class="iv-header">
      <img class="iv-logo" :src="logo" alt="AsyncAPI" />
      <div class="iv-header-title">{{ title }}<span v-if="accent" style="color:#00abc5"> {{ accent }}</span></div>
    </header>
    <main class="iv-body"><slot /></main>
  </div>
</template>
