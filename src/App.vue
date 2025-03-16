<template>
  <div
    id="el"
    style="width: 300px; height: 300px; border: 1px dashed #c5c5c5"
  />
</template>

<script setup lang="ts">
import { useResizeElement } from '../lib'
import { onMounted } from 'vue'

onMounted(() => {
  useResizeElement('#el', {
    // showOnHover: false,
    // showHandleStyle: false,
    // edgeSize: 50,
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
</style>
