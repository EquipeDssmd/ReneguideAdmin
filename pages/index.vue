<template>
  <a-layout>
    <div
      class="box"
    >
      <contents-table />
    </div>
    <content-modal
      @contentUpdated="fetchData"
    />
  </a-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentsTable from '@/components/ContentsTable.vue'
import ContentModal from '@/components/ContentModal.vue'


export default {
  components: {
    ContentsTable,
    ContentModal
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapState(['contents']),
  },
  methods:{
    ...mapActions(['setContents']),
    fetchData(){
      this.$fire.firestore.collection("contents")
      .get()
      .then((querySnapshot) => {
          let newContents = [];
          querySnapshot.forEach((doc) => {
            let data = doc.data()
            data["id"] = doc.id
            newContents.push(data);
          });
          this.setContents(newContents)
      })
      .catch((error) => {
        this.$message.error(this.$t('messages.error')+ ':  '+ error.message)
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
