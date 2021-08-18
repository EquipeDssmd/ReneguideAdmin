const state = () => ({
  user: null,
  contents: []
})

const mutations = {
  SET_USER(state, user){
    state.user = user;
  },
  SET_CONTENTS(state, contents){
    state.contents = contents;
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
  }
}

const getters = {
  getUser(state){
    return state.user;
  },
  getContents(state){
    return state.contents;
  }
}

export default {
  state, 
  actions,
  mutations,
  getters
}