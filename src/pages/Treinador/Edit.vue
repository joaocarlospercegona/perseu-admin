<template>
  <div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="grid-perfil q-gutter-md"
      ref="form"
    >
      <botoes-topo-edicao
        :opcoes="{
          voltar: true,
          editar: false,
          salvar: false,
          remover: false,
        }"
        :isShow="isShow"
        :visualizando="isShow"
        @acaoBotao="acaoBotaoTopo"
        class="grid-a"
      />

      <q-card class="grid-b">
        <q-card-section>
          <div class="text-secondary text-h6 q-mb-md">
            <q-icon name="far fa-check-square" left />
            Treinador
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-xs-4">
              <q-input
                v-model="treinador.name"
                :rules="[validadorRequerido]"
                label="Nome*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="treinador.email"
                :rules="[validadorRequerido]"
                label="Email*"
                maxlength="250"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="treinador.document"
                :rules="[validadorRequerido]"
                label="Documento*"
                v-mask="'###.###.###-##'"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="treinador.cref"
                :rules="[validadorRequerido]"
                label="CREF*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                label="Data de Nascimento"
                v-model="treinador.birthdate"
                :rules="[validadorRequerido]"
                v-mask="'##/##/####'"
                :outlined="!isShow"
                dense
                :readonly="isShow"
              >
                <q-btn
                  slot="append"
                  icon="event"
                  color="primary"
                  flat
                  dense
                  v-if="!isShow"
                >
                  <q-popup-proxy ref="inicio_vigencia">
                    <q-date
                      v-model="treinador.birthdate"
                      mask="DD/MM/YYYY"
                    ></q-date>
                  </q-popup-proxy>
                </q-btn>
              </q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="treinador.team_name"
                label="Equipe*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="grid-d" v-if="!isShow">
        <q-card-section class="row justify-between items-center text-grey-6">
          <div>* Campos obrigatórios</div>
        </q-card-section>
        <q-card-section>
          <div class="q-col-gutter-md">
            <div v-if="!isShow" class="btn-responsivo">
              <q-btn
                class="full-width"
                label="Cancelar"
                icon="fas fa-times"
                type="reset"
                color="primary"
                outline
                no-caps
              ></q-btn>
            </div>
            <div class="btn-responsivo">
              <q-btn
                class="full-width"
                label="Salvar"
                icon="fas fa-save"
                type="submit"
                color="primary"
                no-caps
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>
<script>
import { simNaoOptions } from "src/services/funcoesMixin";
import { validadorRequerido } from "src/services/validador";
import { metodoRespostaErro } from "src/services/funcoes";
import BotoesTopoEdicao from "src/components/BotoesTopoEdicao.vue";
export default {
  mixins: [simNaoOptions],
  components: { BotoesTopoEdicao },
  data() {
    return {
      isShow: false,
      isPwd: false,
      treinador: {
        nome: "",
      },
      numeroColunas: 3,
    };
  },
  watch: {
    "this.$route.path"() {
      this.isShow = this.$route.meta.isShow;
    },
  },
  computed: {
    tamanhoColuna() {
      switch (this.numeroColunas) {
        case 1:
          return "col-12";
        case 2:
          return "col-6";
        case 3:
          return "col-4";
        case 4:
          return "col-3";
      }
    },
  },
  methods: {
    metodoRespostaErro,
    validadorRequerido,
    acaoBotaoTopo(acao) {
      switch (acao) {
        case "novo":
          this.$router.push("/treinadores/edit");
          break;
        case "remover":
          this.removertreinador();
          break;
        case "editar":
          this.$router.push("/treinadores/edit/" + this.treinador.id);
          break;
        case "salvar":
          this.$refs.form.submit();
          break;
        case "desativar":
          this.desativarUsuario();
          break;
        case "ativar":
          this.ativarUsuario();
          break;
        case "cancelar":
        case "voltar":
          this.$refs.form.reset();
          break;
      }
    },
    ativarUsuario() {},
    desativarUsuario() {},
    onResize(size) {
      if (size.width > 1600) this.numeroColunas = 4;
      else if (size.width > 1100) this.numeroColunas = 3;
      else if (size.width <= 1100 && size.width > 800) this.numeroColunas = 2;
      else if (size.width <= 800) this.numeroColunas = 1;
    },
    async onSubmit() {
      let p = { ...this.treinador };
      this.$q.loading.show();
      p.usuario_id = this.getUsuarioLogado.id;
      var response = await this.metodoExecutar({
        url:
          "api/treinadores" +
          (this.treinador.id ? "/" + this.treinador.id : ""),
        method: this.treinador.id ? "put" : "post",
        data: p,
      });
      if (response.status === 200 || response.status == 201) {
        this.$router.push("/treinadores/show/" + response.data.id);
        this.$q.notify({
          message: "treinador salva com sucesso.",
          type: "positive",
        });
      } else this.metodoRespostaErro(response);
      this.$q.loading.hide();
    },
    onReset() {
      if (!this.isShow && this.treinador.id) {
        this.$router.push("/treinadores/show/" + this.treinador.id);
        this.isShow = true;
      } else this.$router.push("/treinadores");
    },
    removertreinador() {
      this.$q
        .dialog({
          title: "Confirmação",
          message:
            "Você tem certeza que deseja excluir esta treinador? Essa ação é irreversível.",
          ok: "Sim",
          cancel: "Não",
        })
        .onOk(async () => {
          var response = await this.metodoExecutar({
            url:
              "api/treinadores/" +
              this.treinador.id +
              "/" +
              this.getUsuarioLogado.id,
            method: "delete",
          });
          if (response.status === 200 || response.status == 201) {
            this.$q.notify({
              message: "treinador removida com sucesso.",
              type: "positive",
            });
            this.$router.push("/categorias");
          } else this.metodoRespostaErro(response);
        });
    },
  },
  async created() {
    this.isShow = this.$route.meta.isShow;
    if (this.$route.params.id !== undefined) {
      let response = await this.metodoExecutar({
        url: "coach/" + this.$route.params.id,
        method: "get",
      });
      if (response.status === 200 || response.status == 201) {
        if (response.data.user) {
          response.data.email = response.data.user.email;
        }
        response.data.birthdate = this.formatarDataHora(
          response.data.birthdate,
          "DD/MM/YYYY"
        );
        response.data.team_name = "";
        if (response.data.team)
          response.data.team_name = response.data.team.name;
        this.treinador = { ...response.data };
      }
    }
  },
};
</script>
<style lang="sass">
@media (min-width: 700px) and (max-width: 1000px)
	.grid-perfil
		display: grid
		grid-template-areas: "a a" "b b" "d d"
		grid-template-columns: 6fr 4fr
@media (min-width: 1001px) and (max-width: 1200px)
	.grid-perfil
		display: grid
		grid-template-areas: "a a" "b b" "d d"
		grid-template-columns: 6fr 4fr
@media (min-width: 1201px)
	.grid-perfil
		display: grid
		grid-template-areas: "a a" "b b" "d d"
		grid-template-columns: 6fr 2fr
.grid-perfil-full-width
	grid-column-start: 1
	grid-column-end: 3
.circle
	width: 24px
	height: 24px
	border-radius: 100%
.div-botao
	position: absolute
	top: 20px
	right: 15px
</style>
