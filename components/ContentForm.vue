<template>
  <div
    v-if="visible"
  >
    <a-form :form="form" layout="horizontal" @submit="handleSubmit" >
      <a-form-item
        v-for="field in selectFields"
        :key="field.label"
        :label="field.label"
        :label-col=" { span: 4 }"
        :wrapper-col="{ span: 14, offset: 4 }"
      >
        <a-input v-decorator="field.decorator" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary" html-type="submit">
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
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
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
    selectFields() {
      return [
        { label: this.$t('columns.title'), decorator: this.decorator('title', this.data.title)},
        { label: this.$t('columns.color'), decorator: this.decorator('color', this.data.color)},
      ]
    }
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
    handleSubmit(e){
      e.preventDefault();
      this.form.validateFields((error, values) => {
        this.updateData(values);
      });
    },
    decorator(label, defaultValue) {
      return [label, { initialValue: defaultValue }]
    },
    updateData(values){
      var docRef = this.$fire.firestore.collection("contents").doc(this.currentContentId);

      return docRef.update(values)
      .then(() => {
        this.$message.success(this.$t('messages.success.update_content'));
        this.$emit('contentUpdated')
      })
      .catch((error) => {
        this.$message.error(this.$t('messages.error') +':  '+ error.message);
      });
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
