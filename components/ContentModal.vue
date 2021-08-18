<template>
  <a-modal
    v-model="visible"
    :title="$t('columns.content')"
    :footer="null"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="1000"
  >
    <content-data
      ref="contentData"
    />
    <content-edit
      @contentUpdated="fetchData"
    />
  </a-modal>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentData from '@/components/ContentData.vue'
import ContentEdit from '@/components/ContentEdit.vue'

export default {
  components: {
    ContentData,
    ContentEdit
  },
  data () {
    return {
      data: [],
    }
  },
  computed: {
    ...mapState(['currentContentId']),
    visible: {
      get () { return this.$store.state.contentModalVisible },
      set (value) {
        this.$store.dispatch('setContentModalVisible', value)
      }
    }
  },
  methods: {
    ...mapActions(['setContentModalVisible']),
    handleOk () {
      this.setContentModalVisible(false)
    },
    handleCancel () {
      this.setContentModalVisible(false)
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
