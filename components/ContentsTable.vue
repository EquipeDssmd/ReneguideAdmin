<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="contents"
      :pagination="pagination"
      :scroll="{ x: 'calc(700px + 50%)',}"
      row-key="id"
      :ellipsis="true"
    >
      <span v-for="title in titles" :key="title.key" :slot="title.slot"> {{ title.title }} </span>
      <span slot="color" slot-scope="text" class="test">
        <div class="content-color" :style="{'background-color': `${text}`}" />
      </span>
      <span slot="articles" slot-scope="text" class="test">
        {{ (text || []).length}}
      </span>
      <span slot="actions" slot-scope="id" class="test">
        <a-button
          @click="viewContentModal(id)"
        >
          {{ $t('actions.view') }}
        </a-button>

        <a-popconfirm placement="topRight" :ok-text="$t('yes')" :cancel-text="$t('no')" @confirm="deleteContent(id)">
          <template slot="title">
            <p>
            {{ $t('messages.confirm.delete') }}
          </p>
          </template>
          <a-button type="danger" ghost>
            {{ $t('actions.delete') }}
          </a-button>
      </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import columns from '@/src/contentsTableColumns.js'

export default {
  data () {
    return {
      columns,
      pagination: {
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50', '100', '200']
      },
      loading: false,
      titles: [
        { slot: 'titleTitle', title: this.$t('columns.title') },
        { slot: 'articlesTitle', title: this.$t('columns.articles') },
        { slot: 'colorTitle', title: this.$t('columns.color') }
      ]
    }
  },
  computed: {
    ...mapState(['contents', 'currentContentId', 'contentModalVisible'])
  },
  methods: {
    ...mapActions(['setContentModalVisible', 'setCurrentContentId']),
    viewContentModal(id){
      this.setCurrentContentId(id)
      this.setContentModalVisible(true)
    },
    deleteContent(id) {

      this.$fire.firestore.collection("contents").doc(id).delete().then(() => {
        this.$message.success(this.$t('messages.success.delete_content'));
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

tr {
border-top: 0px solid;
&:first-child {
    border-top: none;
}
&:nth-child(even) {background: #CCC;}
}

.content-color {
  width: 28px;
  height: 28px;
  border: 4px solid #f0f2f5;
  border-radius: 100%;
  display: inline-block;
  vertical-align: middle;
}
</style>
