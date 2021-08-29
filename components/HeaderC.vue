<template>
  <a-layout-header  class="header-desktop">
    <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']" >
      <a-menu-item v-for="(item, i) in items" :key="i">
        <a-icon :type="item.icon" />
        <span>{{ $t(item.title) }}</span>
        <nuxt-link :to="item.to" />
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { title: 'menu.contents', icon: 'profile', to: '/' },
        { title: 'menu.logout', icon: 'logout', to: '/logout' }
      ]
    }
  }
}
</script>

<style>
.user-item {
  display: flex;
}
.user-item__badge {
  background-color: #ff0000;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 6px;

  .anticon {
    color: white;
    margin: 0;
  }
}
.header-desktop {
  height: 50px;
}
</style>
