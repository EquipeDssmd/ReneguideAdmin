<template>
  <a-layout>
    <div v-if="data !== []">
      <div
        class="box"
      >
        <a-descriptions :title="$t('columns.content')">
          <a-descriptions-item :label="$t('columns.title')">
            {{data.title}}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('columns.color')">
            {{data.color}}
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div
        class="box"
      >
        <div
          v-for="article in data.articles"
          :key="article"
        >
          <a-card>
          <a-descriptions 
            :title="$t('columns.articles')">
            <a-descriptions-item :label="$t('columns.title')">
              {{article.title}}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('columns.infographic')">
              {{data.infographic}}
            </a-descriptions-item>
          </a-descriptions>
          </a-card>
        </div>
      </div>
    </div>
  </a-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  data () {
    return {
      data: []
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
