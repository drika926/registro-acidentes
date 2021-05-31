export const state = () => ({
  paginateItems: []
})

export const mutations = {
  add (state, student) {
    state.paginateItems.data.push(student)
  },
  update (state, { index, student }) {
    state.paginateItems.data[index] = student
  },
  remove (state, index) {
    state.paginateItems.data.splice(index, 1)
  },
  setPaginateItems (state, payload) {
    state.paginateItems = payload
  }
}

export const actions = {
  getStudents ({ commit }, { page, perPage }) {
    return this.$axios.get('/students', {
      params: {
        limit: perPage,
        page
      }
    })
      .then((response) => {
        commit('setPaginateItems', response.data)
      })
  },
  deleteStudent ({ commit }, studentIndex) {
    return this.$axios.delete('/students/' + studentIndex)
  },
  saveStudent ({ commit }, student) {
    return this.$axios.post('/students', student)
  },
  updateStudent ({ commit }, { studentIndex, student }) {
    return this.$axios.put('/students/' + studentIndex, student)
  }
}

export const getters = {
  students: state => state.paginateItems.data,
  links: state => state.paginateItems.links,
  meta: state => state.paginateItems.meta
}
