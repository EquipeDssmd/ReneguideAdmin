<template>
  <a-modal
    v-model="visible"
    :title="$t('columns.content')"
    :footer="null"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="1000"
  >
    <content-form
      :visible="true"
      :new="true"
    />
  </a-modal>

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
    }
  },
  computed: {
    visible: {
      get () { return this.$store.state.newContentModalVisible },
      set (value) {
        this.$store.dispatch('setNewContentModalVisible', value)
      }
    }
  },
  methods: {
    ...mapActions(['setNewContentModalVisible']),
    handleOk () {
      this.setNewContentModalVisible(false)
    },
    handleCancel () {
      this.setNewContentModalVisible(false)
    },
    fetchData (){
      this.$emit('contentUpdated')
      this.$refs.contentData.fetchData()
    }
  }
}
</script>

<style>

</style>
