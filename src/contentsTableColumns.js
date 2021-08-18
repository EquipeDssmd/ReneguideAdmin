module.exports = [
  {
    dataIndex: 'color',
    key: 'color',
    width: '4%',
    scopedSlots: { customRender: 'color' },
    slots: { title: 'colorTitle' },
  },
  {
    dataIndex: 'title',
    key: 'title',
    slots: { title: 'titleTitle' }
  },
  {
    dataIndex: 'articles',
    key: 'articles',
    scopedSlots: { customRender: 'articles' },
    slots: { title: 'articlesTitle' },
  },
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'actions' }
  }
]
