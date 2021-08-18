<template>
  <a-layout>
    <div v-if="data !== []">
      <div
        class="box"
        :style="{ background: 'rgb(255, 255, 247)' }"
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
        :style="{ background: 'rgb(255, 255, 247)' }"
      >
        <h1>{{$t('columns.articles')}}</h1>
        <a-card
          v-for="article in data.articles"
          :title="article.title"
          :bordered="false" style="width: 25%"
        >
          <p>{{article.title}}</p>
          <p>{{article.infographic}}</p>
        </a-card>
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
  computed: {
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
      this.$fire.firestore.collection("contents").doc(this.$route.params.id)
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
