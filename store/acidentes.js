export const state = () => ({
  paginateItems: {
    data: [
      {
        id: 0,
        nome: 'luan santos pereira',
        idade: 18,
        sexo: 'M',
        rodovia: 'BR-316',
        cidade: 'Marituba',
        estado: 'Pará',
        latitude: '23.21212',
        longitude: '03.323232'
      },
      {
        id: 1,
        nome: 'maria romão alves',
        idade: 27,
        sexo: 'F',
        rodovia: 'BR-116',
        cidade: 'Fortaleza',
        estado: 'Ceará',
        latitude: '23.233223',
        longitude: '122.11211'
      },
      {
        id: 2,
        nome: 'lucélia silva de souza',
        idade: 33,
        sexo: 'F',
        rodovia: 'BR-101',
        cidade: 'Touros',
        estado: 'Rio Grande do Norte',
        latitude: '2.12122112',
        longitude: '33.22232323'
      },
      {
        id: 3,
        nome: 'marcos fábio pinheiro',
        idade: 63,
        sexo: 'M',
        rodovia: 'BR-230',
        cidade: 'Itaituba',
        estado: 'Pará',
        latitude: '4.233223',
        longitude: '2.3293223'
      },
      {
        id: 4,
        nome: 'luana alves de souza',
        idade: 26,
        sexo: 'F',
        rodovia: 'BR-163',
        cidade: 'Santarém',
        estado: 'Pará',
        latitude: '3.22323',
        longitude: '2.122112'
      },
      {
        id: 5,
        nome: 'adriana sasayamoma',
        idade: 43,
        sexo: 'F',
        rodovia: 'BR-153',
        cidade: 'São Domingos do Araguaia',
        estado: 'Pará',
        latitude: '3.2122121',
        longitude: '5.121212'
      }
    ],
    links: [
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com',
      'https://google.com'
    ],
    meta: {
      links: 20
    }
  }
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
  getAcidentes ({ commit }, { page, perPage }) {
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
  deleteAcidente ({ commit }, studentIndex) {
    return this.$axios.delete('/students/' + studentIndex)
  },
  saveAcidente ({ commit }, student) {
    return this.$axios.post('/students', student)
  },
  updateAcidente ({ commit }, { studentIndex, student }) {
    return this.$axios.put('/students/' + studentIndex, student)
  }
}

export const getters = {
  acidentes: state => state.paginateItems.data,
  links: state => state.paginateItems.links,
  meta: state => state.paginateItems.meta
}
