<template>
<div>
  <a-upload
    name="file"
    :multiple="false"
    :headers="headers"
    :transform-file="transformFile"
  >
    <a-button> <a-icon type="upload" /> Click to Upload </a-button>
  </a-upload>
</div>
</template>
<script>
  import randomstring from 'randomstring'

export default {
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    };
  },
  methods: {
    transformFile(file) {
      this.uploadFile(file);
    },
    uploadFile(file) {
      var storageRef = this.$fireModule.storage().ref();
      var name = randomstring.generate({length: 6}) + file.name;
      var pdfRef = storageRef.child(name);
      var pdfImagesRef = storageRef.child('images/'+ name);

      pdfRef.put(file).then((snapshot) => {
        this.$message.success(`${file.name} ${this.$t('messages.success.upload')}`);
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.$emit('pdfUploaded', downloadURL)
        });
      });
      
    }
  },
};
</script>