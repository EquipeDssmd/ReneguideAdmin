<template>
  <a-layout>
    <div v-if="data !== []">
      <a-button
        block
        @click="changeVisibility"
      >
          {{$t('actions.edit')}}
      </a-button>
      <content-form 
        :visible="visible"
        @contentUpdated="contentUpdated"
      />
    </div>
  </a-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentForm from '@/components/ContentForm.vue'

export default {
  components: {
    ContentForm
  },
  data () {
    return {
      data: [],
      visible: false
    }
  },
  mounted() {
  },
  methods:{
    changeVisibility() {
      this.visible = !this.visible;
    },
    contentUpdated() {
      this.$emit('contentUpdated')
    }
  }
}
</script>

<style>

.box {
  background-color: white;
  box-shadow: 0 3px 4px 0px #e5e5e5;
  border: 1px solid #e9e9e9;
  padding: 12px;
  margin: 12px 8px;
  border-radius: 4px;
}

</style>
