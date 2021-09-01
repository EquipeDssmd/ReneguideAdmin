<template>
  <a-card>
    <a-descriptions :column="8">
      <a-descriptions-item :label="$t('columns.title')" span="2">
        <a-input v-if="edit" v-model="data.title" />
        <div v-else>{{article.title}}</div>
      </a-descriptions-item>
      <a-descriptions-item :label="$t('columns.infographic')" span="4">
        <div
          v-if="edit"
        >
          <a :href="data.infographic">Preview</a>
          <infographic-upload @pdfUploaded="updateInfographic($event)" />
        </div>
        <div v-else>
          <a :href="article.infographic">Link</a>
        </div>
      </a-descriptions-item>
      <a-descriptions-item span="2">

        <a-button v-if="edit" @click="editArticle">{{$t('actions.save')}}</a-button>
        <a-button @click="changeEdit">
          <span v-if="edit">{{$t('actions.cancel')}}</span>
          <span v-else>{{$t('actions.edit')}}</span>
        </a-button>
        <a-button @click="deleteArticle" type="danger" ghost>{{$t('actions.delete')}}</a-button>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script type="text/javascript">

import InfographicUpload from '@/components/InfographicUpload.vue'
export default {
  components: {
    InfographicUpload
  },
  props: {
    article: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      data: {},
      edit: false,
    }
  },
  mounted() {
    this.setData()
  },
  methods:{
    setData () {
      this.data = {
        title: this.article.title,
        infographic: this.article.infographic
      }
    },
    changeEdit() {
      this.edit = !this.edit
    },
    updateInfographic(newUrl) {
      this.data.infographic = newUrl;
    },
    editArticle(){
      this.$emit('edit', this.data)
    },
    deleteArticle() {
      this.$emit('delete')
    }
  }
}
</script>

<style>
.testeee{
  max-width: 100%;
}
</style>

