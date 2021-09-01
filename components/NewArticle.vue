<template>
  <a-card>
    <a-descriptions :column=8>
      <a-descriptions-item :label="$t('columns.title')" span="2">
        <a-input v-model="title"/>
      </a-descriptions-item>
      <a-descriptions-item :label="$t('columns.infographic')" span="4">
        <a :href="infographic">Preview</a>
        <infographic-upload @pdfUploaded="editInfographic($event)"/>
      </a-descriptions-item>
      <a-descriptions-item span="2">
    	<a-button type="primary" icon="save" @click="sendData" ghost>{{$t('actions.add_article')}}</a-button>
      </a-descriptions-item>
    </a-descriptions>

  </a-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import InfographicUpload from '@/components/InfographicUpload.vue'
export default {
  components: {
    InfographicUpload
  },
  data () {
    return {
      title: '',
      infographic: ''
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(['currentContentId']),
    currentArticle() {
      return {
        title: this.title,
        infographic: this.infographic
      }
    }
  },
  methods:{
    ...mapActions(['setContents']),
    editInfographic(newUrl) {
      this.infographic = newUrl;
    },
    sendData(){
      this.$fire.firestore.collection("contents").doc(this.currentContentId)
      .update({'articles': this.$fireModule.firestore.FieldValue.arrayUnion(this.currentArticle)})
      .then(() => {
        this.$message.success('messages.success.add_article')
      	this.$emit('contentUpdated')
      })
      .catch((error) => {
        this.$message.error(this.$t('messages.error') +':  '+ error.message);
      });
    },
  }
}
</script>
