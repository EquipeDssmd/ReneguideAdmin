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
          :style="{fontSize: '20px'}"
          @click="viewContentModal(id)"
        >{{ $t('actions.view') }}</a-button>
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
