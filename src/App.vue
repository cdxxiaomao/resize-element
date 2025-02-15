<template>
  <div class="container">
    <div
      ref="el"
      style="width: 300px; height: 300px; border: 1px solid #000"
    />
  </div>
</template>

<script setup lang="ts">
import { useResizeElement } from '../lib'
import { onMounted, ref, unref } from 'vue'

const el = ref()

onMounted(() => {
  useResizeElement(unref(el), {
    position: [
      'bottom',
      'left',
      'top',
      'right',
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right'
    ]
  })
})
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%
}
</style>
