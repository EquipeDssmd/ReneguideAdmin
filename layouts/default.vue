<template>
  <a-layout id="main-content" class="main-content" :style="{ height: '100vh' }">
    <header-c />

    <a-layout>
      <a-layout-content
        :style="{ minHeight: '280px' }"
      >
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import HeaderC from '@/components/HeaderC'
export default {
  components: {
    HeaderC,
  }
}
</script>

