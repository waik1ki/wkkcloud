import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

import auth from '@/store/modules/auth';
import file from '@/store/modules/file';
import container from '@/store/modules/container';
import overview from '@/store/modules/overview';
import error from '@/store/modules/error';

export default new Vuex.Store({
  state: {
    checked: true,
    respText: null,
  },
  mutations: {
    setChecked(state, checked) {
      state.checked = checked
    },
    setRespText(state, text) {
      state.respText = text
    }
  },
  actions: {
  },
  modules: {
    auth,
    file,
    container,
    overview,
    error,
  },
  plugins: [createPersistedState({
    paths: ["auth"] 
  })]
})
