<template>
  <a-layout>
    <div
      class="box"
      :style="{ background: 'rgb(255, 255, 247)' }"
    >
      {{$route.params.id}}
    </div>
  </a-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  mounted() {
    //this.fetchData()
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
          console.log("Error getting documents: ", error);
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
