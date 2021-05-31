<template>
  <v-container>
    <v-card class="mt-8 pa-4 col-md-4 mx-auto text-center">
      <v-form @submit.prevent="login">
        <v-row>
          <v-col col="4">
            <v-img
              contain
              alt="Logo do Grupo A"
              src="https://www.grupoa.com.br/hs-fs/hubfs/Logos%20BUs%20-%20Site%20Mais%20A%20Educa%C3%A7%C3%A3o/+a-22-22%20(1).png?width=100&name=+a-22-22%20(1).png"
              max-width="200"
              max-height="100"
              class="mx-auto"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col col="4">
            <h1 class="text-uppercase pb-4 text-no-wrap">
              Login
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <v-text-field v-model="loginData.email" type="email" placeholder="e-mail" outlined />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col col="12">
            <v-text-field v-model="loginData.password" type="password" placeholder="senha" outlined />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col col="4">
            <v-btn type="submit">
              Entrar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  auth: false,
  data: () => ({
    loginData: {
      email: '',
      password: '',
      device_name: 'web'
    }
  }),
  methods: {
    login () {
      this.$auth.login({ data: this.loginData })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          if (error) {
            //
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
