<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :items-per-page.sync="perPage"
      :headers="headers"
      :items="acidentes"
      :search="search"
      :loading="loading"
      :page.sync="page"
      loading-text="Carregando dados... aguarde"
      @update:items-per-page="updateAcidentes"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Acidentes</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Novo Acidente
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.rodovia"
                        label="Rodovia"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cidade"
                        label="Cidade"
                        :disabled="editedIndex !== -1"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.Estado"
                        label="Estado"
                        :disabled="editedIndex !== -1"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">
                você tem certeza que deseja excluir esse acidente?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
          @click="updateAcidentes"
        >
          Resetar
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="meta === undefined ? 0 : meta.links.length"
      @input="updateAcidentes"
    />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Acidentes',
  data: () => ({
    page: 0,
    search: '',
    headers: [
      { text: 'Nome', value: 'nome' },
      { text: 'Idade', value: 'idade' },
      { text: 'Sexo', value: 'sexo' },
      { text: 'Rodovia', value: 'rodovia' },
      { text: 'Cidade', value: 'cidade' },
      { text: 'Estado', value: 'estado' },
      { text: 'Latitude', value: 'latitude' },
      { text: 'Longitude', value: 'longitude' },
      { text: 'Ações', value: 'actions', sortable: false, filterable: false }
    ],
    perPage: 10,
    dialogDelete: false,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      id: 0,
      nome: '',
      idade: 0,
      sexo: 0,
      rodovia: '',
      cidade: '',
      estado: '',
      latitude: '',
      longitude: ''
    },
    defaultItem: {
      id: 0,
      nome: '',
      idade: 0,
      sexo: 0,
      rodovia: '',
      cidade: '',
      estado: '',
      latitude: '',
      longitude: ''
    },
    loading: false
  }),
  computed: {
    ...mapGetters({
      acidentes: 'acidentes/acidentes',
      meta: 'acidentes/meta'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Acidente' : 'Editar Acidente'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  mounted () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
    ...mapActions({
      getAcidentes: 'acidentes.js/getAcidentes',
      deleteAcidente: 'acidentes.js/deleteAcidente',
      saveAcidente: 'acidentes.js/saveAcidente',
      updateAcidente: 'acidentes.js/updateAcidente'
    }),
    updateAcidentes () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    editItem (item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.loading = true
      this.deleteAcidente(this.editedItem.id)
      setTimeout(() => {
        this.loading = false
      }, 3000)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        this.loading = true
        this.editedItemProps = { name: this.editedItem.name, email: this.editedItem.email }
        this.updateAcidente({ student: this.editedItemProps, studentIndex: this.editedItem.id })
        setTimeout(() => {
          this.loading = false
        }, 3000)
      } else {
        this.loading = true
        this.saveAcidente(this.editedItem)
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
