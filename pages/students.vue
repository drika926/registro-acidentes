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
      :items="students"
      :search="search"
      :loading="loading"
      :page.sync="page"
      loading-text="Carregando dados... aguarde"
      @update:items-per-page="updateStudents"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Alunos</v-toolbar-title>
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
                Novo Aluno
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
                        v-model="editedItem.name"
                        label="Nome"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                        :disabled="editedIndex !== -1"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.ra"
                        label="RA"
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
                você tem certeza que deseja excluir esse aluno?
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
          @click="updateStudents"
        >
          Resetar
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="meta === undefined ? 0 : meta.links.length"
      @input="updateStudents"
    />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Students',
  data: () => ({
    page: 0,
    search: '',
    headers: [
      { text: 'RA', value: 'ra' },
      { text: 'Nome', value: 'name' },
      { text: 'E-mail', value: 'email' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Actions', value: 'actions', sortable: false, filterable: false }
    ],
    perPage: 10,
    dialogDelete: false,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      cpf: 0,
      email: 0,
      ra: 0
    },
    defaultItem: {
      id: 0,
      name: '',
      cpf: 0,
      email: 0,
      ra: 0
    },
    loading: false
  }),
  computed: {
    ...mapGetters({
      students: 'students/students',
      meta: 'students/meta'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Aluno' : 'Editar Aluno'
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
    this.getStudents({ perPage: this.perPage, page: this.page })
      .then(() => {
        this.loading = false
      })
      .catch((error) => {
        if (error) {
          this.loading = false
        }
      })
  },
  methods: {
    ...mapActions({
      getStudents: 'students/getStudents',
      deleteStudent: 'students/deleteStudent',
      saveStudent: 'students/saveStudent',
      updateStudent: 'students/updateStudent'
    }),
    updateStudents () {
      this.loading = true
      this.getStudents({ page: this.page, perPage: this.perPage === -1 ? this.meta.total : this.perPage })
        .then(() => {
          this.loading = false
        })
        .catch((error) => {
          if (error) {
            this.loading = false
          }
        })
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
      this.deleteStudent(this.editedItem.id)
        .then(() => {
          this.loading = false
          this.updateStudents()
        })
        .catch((error) => {
          if (error) {
            this.loading = false
          }
        })
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
        this.updateStudent({ student: this.editedItemProps, studentIndex: this.editedItem.id })
          .then(() => {
            this.loading = false
            this.updateStudents()
          })
          .catch((error) => {
            if (error) {
              this.loading = false
            }
          })
      } else {
        this.loading = true
        this.saveStudent(this.editedItem)
          .then(() => {
            this.loading = false
            this.updateStudents()
          })
          .catch((error) => {
            if (error) {
              this.loading = false
            }
          })
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
