<template>
  <div
    v-if="visible"
  >
    <a-form layout="horizontal">
      <a-form-item
        :label="$t('columns.title')"
        :label-col=" { span: 4 }"
        :wrapper-col="{ span: 14, offset: 4 }"
      >
        <a-input placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        :label="$t('columns.color')"
        :label-col=" { span: 4 }"
        :wrapper-col="{ span: 14, offset: 4 }"
      >
        <a-input placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: [],
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
  },
  methods:{
    fetchData(){
      this.$fire.firestore.collection("contents").doc(this.currentContentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.data = doc.data()
        }
      })
    },
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
