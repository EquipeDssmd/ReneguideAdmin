<template>
  <a-layout>
    <div v-if="data !== []">
      <a-row>
        <!-- dados principais -->
        <div
          v-if="!editVisible"
        >
          <a-col :span="23">
            <a-descriptions class="box" :title="$t('columns.content')">
              <a-descriptions-item :label="$t('columns.title')">
                {{data.title}}
              </a-descriptions-item>
              <a-descriptions-item :label="$t('columns.color')">
                {{data.color}}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
        
          <a-col :span="1">
            <a-button class="edit-button" type="primary" block icon="edit" size="large" @click="changeVisibility"/>
          </a-col>
        </div>

        <div v-else>
          <content-form 
            :visible="editVisible"
            @contentUpdated="contentUpdated"
          />
        </div>
      </a-row>
    
      <!-- artigos -->
      <a-card
        v-if="data.articles"
        :title="$t('columns.articles')"
      >
        <div v-if="data.articles.length === 0">
          {{$t('null')}}
        </div>
        <div
          v-for="article in data.articles"
          :key="article"
        >
          <a-card>
            <a-descriptions>
              <a-descriptions-item :label="$t('columns.title')" span="2">
                {{article.title}}
              </a-descriptions-item>
              <a-descriptions-item :label="$t('columns.infographic')"  span="2">
                {{article.infographic || $t('null')}}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </div>
        <new-article v-if="articleVisible" @contentUpdated="newArticleSaved"/>
        <a-button type="primary" icon="plus" @click="changeArticleVisibility" block > {{$t('actions.add_article')}}</a-button>
      </a-card>

    </div>
  </a-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import randomstring from 'randomstring'

import ContentForm from '@/components/ContentForm.vue'
import NewArticle from '@/components/NewArticle.vue'

export default {
  components: {
    ContentForm,
    NewArticle
  },
  data () {
    return {
      data: [],
      editVisible: false,
      articleVisible: false
    }
  },
  mounted() {
    this.fetchData()
  },

  watch: {
    currentContentId (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchData()
      }
    }
  },
  computed: {
    ...mapState(['currentContentId']),
    contents: {
      get () {
        return this.$store.state.contents
      },
      set (newValue) {
        return this.setContents(newValue)
      }
    },
  },
  methods:{
    ...mapActions(['setContents']),
    fetchData(){
      this.$fire.firestore.collection("contents").doc(this.currentContentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.data = doc.data()
        }
      })
    },
    changeVisibility() {
      this.editVisible = !this.editVisible;
    },
    changeArticleVisibility() {
      this.articleVisible = !this.articleVisible;
    },
    contentUpdated() {
      this.changeVisibility()
      this.$emit('contentUpdated')
    },
    newArticleSaved() {
      this.changeArticleVisibility()
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
.edit-button {
  margin-top:  45px;
}


</style>
