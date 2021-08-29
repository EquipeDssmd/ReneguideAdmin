const state = () => ({
  user: null,
  contents: [],
  contentModalVisible: false,
  newContentModalVisible: false,
  currentContentId: ""
})

const mutations = {
  SET_USER(state, user){
    state.user = user;
  },
  SET_CONTENTS(state, contents){
    state.contents = contents;
  },
  SET_CONTENT_MODAL_VISIBLE(state, value){
    state.contentModalVisible = value;
  },
  SET_NEW_CONTENT_MODAL_VISIBLE(state, value){
    state.newContentModalVisible = value;
  },
  SET_CURRENT_CONTENT_ID(state, value){
    state.currentContentId = value;
  },
  PUSH_CONTENT(state, value){
    state.contents.push(value);
  }
}

const actions = {
  async onAuthStateChangedAction(state, {authUser, claims}) {
    if(!authUser) {
      state.commit('SET_USER', null)

      this.$router.push({
        path: 'login'
      })
    } else {
      const { uid, email } = authUser;
      state.commit('SET_USER', {
        uid, email
      })
    }
  },
  setContents({commit}, value){
    commit('SET_CONTENTS', value)
  },
  pushContent({commit}, value){
    commit('PUSH_CONTENT', value)
  },
  setContentModalVisible({commit}, value){
    commit('SET_CONTENT_MODAL_VISIBLE', value)
  },
  setNewContentModalVisible({commit}, value){
    commit('SET_NEW_CONTENT_MODAL_VISIBLE', value)
  },
  setCurrentContentId({commit}, value){
    commit('SET_CURRENT_CONTENT_ID', value)
  }
}

const getters = {
  getUser(state){
    return state.user;
  },
  getContents(state){
    return state.contents;
  },
  getCurrentContentId(state){
    return state.currentContentId
  },
  getContentModalVisible(state){
    return state.currentContentId
  }
}

export default {
  state, 
  actions,
  mutations,
  getters
}