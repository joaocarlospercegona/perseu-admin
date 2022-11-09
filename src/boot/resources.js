import { mapGetters } from "vuex";
import moment from "moment";
import { metodoRespostaErro } from "src/services/funcoes";
export default ({ app }) => {
  app.mixin({
    computed: {
      ...mapGetters({
        getLogin: "getLogin",
        getUsuarioLogado: "getUsuario",
      }),
    },
    methods: {
      metodoRespostaErro,
      metodoExecutar: async function (data) {
        let response;
        try {
          if (
            this.getLogin &&
            this.getLogin.token &&
            !this.$axios.defaults.headers.common["Authorization"]
          ) {
            this.$axios.defaults.headers.common["Authorization"] =
              this.getLogin.type + " " + this.getLogin.token;
          }

          response = await this.$axios.request(data);
        } catch (e) {
          response = e.response;
        }
        return response;
      },
      formatarDataHora: function (d, f1, f2) {
        return f2 ? moment(d, f1).format(f2) : moment(d).format(f1);
      },
      create_UUID() {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
          }
        );
        return uuid;
      },
      validatorEmail(val) {
        let index = val.indexOf("@");
        return (
          (index > 0 && val.includes(".", index)) || "Este email é inválido."
        );
      },
      validatorRequired(val) {
        return (val !== null && val !== "") || "Este campo é obrigatório.";
      },
    },
  });
};
