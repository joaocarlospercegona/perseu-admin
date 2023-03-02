<template>
  <q-page class="grid-login" style="heigth: 100vh">
    <div class="grid-a text-center align-center">
      <q-img
        src="images/logoColorida.png"
        style="max-height: 300px; max-width: 200px"
      ></q-img>
    </div>
    <div class="grid-c q-px-lg q-py-lg">
      <q-card class="">
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-y-md">
              <div class="text-center text-h6">Faça o seu Login</div>
              <div class="q-gutter-y-sm">
                <q-input
                  ref="email"
                  type="email"
                  v-model="email"
                  label="E-mail"
                  outlined
                  :rules="[validatorEmail, validatorRequired]"
                  v-on:keyup.enter="$refs.password.focus()"
                ></q-input>
                <q-input
                  ref="password"
                  type="password"
                  v-model="password"
                  label="Senha"
                  outlined
                  :rules="[validatorRequired]"
                ></q-input>
              </div>
              <div class="row align-center">
                <div class="col-md-4 col-xs-12">
                  <q-btn
                    class="full-width q-px-lg"
                    type="submit"
                    label="Login"
                    color="primary"
                    no-caps
                  ></q-btn>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </transition>
      </q-card>
    </div>
    <div
      class="grid-d align-center"
      style="margin-bottom: 30px; align-items: flex-end"
    >
      <div class="row text-center">
        <div class="col-12 text-bold">Desenvolvedores:</div>
        <div class="col-12">Carlos</div>
        <div class="col-12">Eduardo</div>
        <div class="col-12">João</div>
      </div>
    </div>
    <div class="grid-b">
      <q-img class="fit" src="images/logoT.gif">
        <div
          class="fit align-center"
          style="background-color: rgba(0, 0, 0, 0.6); max-height: 100vh"
        ></div>
      </q-img>
    </div>
  </q-page>
</template>
<script>
import { efetuarLogout } from "src/services/funcoes";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    efetuarLogout,
    async onSubmit() {
      this.$q.loading.show();
      var response = await this.metodoExecutar({
        url: "admin/login",
        method: "post",
        data: { email: this.email, password: this.password },
      });
      if (response.status === 200) {
        let login = {
          token: response.data.token,
          type: "Bearer",
        };
        await this.$store.commit("setDados", { key: "login", value: login });
        await this.$store.commit("setDados", {
          key: "usuario",
          value: response.data.user,
        });
        this.$router.push("/");
      } else this.metodoRespostaErro(response);
      this.$q.loading.hide();
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  async created() {
    if (this.$route.path === "/logout") await this.efetuarLogout();
    else if (!this.isBlank(this.getLogin.token)) this.$router.push("/");
  },
};
</script>
