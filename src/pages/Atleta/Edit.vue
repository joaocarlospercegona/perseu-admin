<template>
  <div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="grid-perfil q-gutter-md"
      ref="form"
    >
      <botoes-topo-edicao
        :isShow="isShow"
        :visualizando="isShow"
        @acaoBotao="acaoBotaoTopo"
        class="grid-a"
      />

      <q-card class="grid-b">
        <q-card-section>
          <div class="text-secondary text-h6 q-mb-md">
            <q-icon name="far fa-check-square" left />
            Atleta
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-xs-4">
              <q-input
                v-model="atleta.name"
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
                v-model="atleta.email"
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
                v-model="atleta.password"
                :rules="[validadorRequerido]"
                :type="!isPwd ? 'password' : 'text'"
                label="Senha*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="atleta.document"
                :rules="[validadorRequerido]"
                label="Documento*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>

            <div class="col-xs-4">
              <q-input
                label="Data de Nascimento"
                v-model="atleta.birthdate"
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
                      v-model="atleta.birthdate"
                      mask="DD/MM/YYYY"
                    ></q-date>
                  </q-popup-proxy>
                </q-btn>
              </q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="atleta.weight"
                :rules="[validadorRequerido]"
                label="Peso*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="atleta.height"
                :rules="[validadorRequerido]"
                label="Altura*"
                maxlength="80"
                :readonly="isShow"
                :outlined="!isShow"
                dense
              ></q-input>
            </div>
            <div class="col-xs-4">
              <q-select
                v-model="atleta.ativo"
                hint
                :options="simNaoOptions"
                label="Ativo"
                :outlined="true"
                :readonly="isShow"
                emit-value
                map-options
                dense
              >
                <template v-slot:prepend>
                  <q-btn
                    :icon="
                      atleta.ativo ? 'fas fa-check-square' : 'far fa-square'
                    "
                    dense
                    flat
                    :disable="isShow"
                    @click.stop="atleta.ativo = !atleta.ativo"
                  />
                </template>
              </q-select>
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
      atleta: {
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
          this.$router.push("/atletas/edit");
          break;
        case "remover":
          this.removeratleta();
          break;
        case "editar":
          this.$router.push("/atletas/edit/" + this.atleta.id);
          break;
        case "salvar":
          this.$refs.form.submit();
          break;
        case "cancelar":
        case "voltar":
          this.$refs.form.reset();
          break;
      }
    },
    onResize(size) {
      if (size.width > 1600) this.numeroColunas = 4;
      else if (size.width > 1100) this.numeroColunas = 3;
      else if (size.width <= 1100 && size.width > 800) this.numeroColunas = 2;
      else if (size.width <= 800) this.numeroColunas = 1;
    },
    async onSubmit() {
      let p = { ...this.atleta };
      this.$q.loading.show();
      p.usuario_id = this.getUsuarioLogado.id;
      var response = await this.metodoExecutar({
        url: "api/atletas" + (this.atleta.id ? "/" + this.atleta.id : ""),
        method: this.atleta.id ? "put" : "post",
        data: p,
      });
      if (response.status === 200 || response.status == 201) {
        let log = {
          usuario_id: this.getUsuarioLogado.id,
          data_hora: new Date(),
          acao: this.atleta.id
            ? "Alterando dados da atleta de Pessoa: " + this.atleta.nome
            : "Criando a atleta de Pessoa: " + this.atleta.nome,
          codigo: this.atleta.id ? 4 : 5,
          alteracoes: {
            dominio: null,
            ...response.data,
          },
        };
        this.criarLog(log);

        this.$router.push("/atletas/show/" + response.data.id);
        this.$q.notify({
          message: "atleta salva com sucesso.",
          type: "positive",
        });
      } else this.metodoRespostaErro(response);
      this.$q.loading.hide();
    },
    onReset() {
      if (!this.isShow && this.atleta.id) {
        this.$router.push("/atletas/show/" + this.atleta.id);
        this.isShow = true;
      } else this.$router.push("/atletas");
    },
    removeratleta() {
      this.$q
        .dialog({
          title: "Confirmação",
          message:
            "Você tem certeza que deseja excluir esta atleta? Essa ação é irreversível.",
          ok: "Sim",
          cancel: "Não",
        })
        .onOk(async () => {
          console.log("abc");
        });
    },
  },
  async created() {
    this.isShow = this.$route.meta.isShow;
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
