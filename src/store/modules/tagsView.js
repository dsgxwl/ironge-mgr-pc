import * as type from '../action-types'
const state = {
  visitedViews: [],
  cachedViews: [],
}

const mutations = {
  [type.ADD_VISITED_VIEW]: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(Object.assign({}, view, { title: view.meta.title }))
  },
  [type.ADD_CACHED_VIEW]: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  [type.DEL_VISITED_VIEW]: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [type.DEL_CACHED_VIEW]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  [type.DEL_OTHERS_VISITED_VIEWS]: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  [type.DEL_OTHERS_CACHED_VIEWS]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  [type.DEL_ALL_VISITED_VIEWS]: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  [type.DEL_ALL_CACHED_VIEWS]: state => {
    state.cachedViews = []
  },

  [type.UPDATE_VISITED_VIEW]: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
}

const actions = {
  [type.ADD_VIEW]({ dispatch }, view) {
    dispatch(type.ADD_VISITED_VIEW, view)
    dispatch(type.ADD_CACHED_VIEW, view)
  },
  [type.ADD_VISITED_VIEW]({ commit }, view) {
    commit(type.ADD_VISITED_VIEW, view)
  },
  [type.ADD_CACHED_VIEW]({ commit }, view) {
    commit(type.ADD_CACHED_VIEW, view)
  },

  [type.DEL_VIEW]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(type.DEL_VISITED_VIEW, view)
      dispatch(type.DEL_CACHED_VIEW, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  [type.DEL_VISITED_VIEW]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(type.DEL_VISITED_VIEW, view)
      resolve([...state.visitedViews])
    })
  },
  [type.DEL_CACHED_VIEW]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(type.DEL_CACHED_VIEW, view)
      resolve([...state.cachedViews])
    })
  },

  [type.DEL_OTHERS_VIEWS]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(type.DEL_OTHERS_VISITED_VIEWS, view)
      dispatch(type.DEL_OTHERS_VISITED_VIEWS, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  [type.DEL_OTHERS_VISITED_VIEWS]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(type.DEL_OTHERS_VISITED_VIEWS, view)
      resolve([...state.visitedViews])
    })
  },
  [type.DEL_OTHERS_CACHED_VIEWS]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(type.DEL_OTHERS_CACHED_VIEWS, view)
      resolve([...state.cachedViews])
    })
  },

  [type.DEL_ALL_VIEWS]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(type.DEL_ALL_VISITED_VIEWS, view)
      dispatch(type.DEL_ALL_CACHED_VIEWS, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  [type.DEL_ALL_VISITED_VIEWS]({ commit, state }) {
    return new Promise(resolve => {
      commit(type.DEL_ALL_VISITED_VIEWS)
      resolve([...state.visitedViews])
    })
  },
  [type.DEL_ALL_CACHED_VIEWS]({ commit, state }) {
    return new Promise(resolve => {
      commit(type.DEL_ALL_CACHED_VIEWS)
      resolve([...state.cachedViews])
    })
  },

  [type.UPDATE_VISITED_VIEW]({ commit }, view) {
    commit(type.UPDATE_VISITED_VIEW, view)
  },
}

export default {
  state,
  mutations,
  actions,
}
