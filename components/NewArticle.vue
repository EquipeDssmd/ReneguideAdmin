<template>
  <a-card>
    <a-descriptions>
      <a-descriptions-item :label="$t('columns.title')">
        <a-input v-model="title"/>
      </a-descriptions-item>
      <a-descriptions-item :label="$t('columns.infographic')">
        <a-input v-model="infographic"/>
      </a-descriptions-item>
      <a-descriptions-item >
    	<a-button type="primary" icon="save" @click="sendData" ghost>{{$t('actions.add_article')}}</a-button>
      </a-descriptions-item>
    </a-descriptions>

  </a-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
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
