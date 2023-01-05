<template>
  <q-dialog v-model="modalKanban">
    <q-card style="min-width: 80vw">
      <q-card-section class="row justify-between text-black text-h6 q-pb-none">
        <div>
          <q-icon name="far fa-check-square" left />
          Designar Cargo Treinador
        </div>
        <div>
          <q-icon name="close" left @click="cancelar()" />
        </div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-sm text-black">
        <div class="col-6 row q-col-gutter-sm">
          <div class="col-12 text-black">Treinador Atual</div>
          <div class="col-6">
            <q-input
              v-model="treinadorAtual.name"
              :readonly="true"
              label="Treinador Atual"
              :outlined="!isShow"
              dense
            ></q-input>
          </div>
          <div class="col-6">
            <q-input
              v-model="treinadorAtual.email"
              :readonly="true"
              label="Email Atual"
              :outlined="!isShow"
              dense
            ></q-input>
          </div>
        </div>
        <div class="col-6 row q-col-gutter-sm">
          <div class="col-12 text-black">Novo Treinador</div>
          <div class="col-6">
            <q-select
              v-model="newCoach"
              :options="treinadoresOptions"
              @filter="buscarTreinadores"
              use-input
              map-options
              emit-value
              option-label="name"
              clearable
              @update:model-value="selecionarTreinador(newCoach)"
              label="Novo Treinador"
              dense
              :outlined="!isShow"
              :readonly="isShow"
            />
          </div>
          <div class="col-6" v-if="newCoach">
            <q-input
              v-model="newCoach.email"
              :readonly="true"
              label="Email Treinador"
              :outlined="!isShow"
              dense
            ></q-input>
          </div>
        </div>

        <div class="col-12 row justify-end q-mt-sm q-gutter-x-sm">
          <q-btn
            label="Alterar Treinador"
            icon="fas fa-save"
            color="primary"
            no-caps
            @click="alterar()"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { simNaoOptions } from "src/services/funcoesMixin";
export default {
  mixins: [simNaoOptions],
  name: "ComponenteKanban",
  components: {},
  data() {
    return {
      newCoach: "",
      treinadoresOptions: [],
      modalKanban: false,
      texto: "",
      treinadorAtual: "",
      equipe: {},
      pagination: {
        sortBy: "name",
        descending: false,
        page: 1,
        rowsPerPage: 9999,
        rowsNumber: 0,
      },
    };
  },
  watch: {},
  methods: {
    logoProduto(img) {
      if (img == "nada") return "images/avatar.png";
      //window.open(`${process.env.API_URL}api/produtos/imagem/${img}`)
      return process.env.API_URL + "api/produtos/imagem/" + img;
    },
    async abrir(equipe) {
      this.modalKanban = true;
      this.equipe = { ...equipe };
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
        this.treinadorAtual = response.data;
      }
    },
    cancelar() {
      this.modalKanban = false;
    },
    selecionarTreinador(treinador) {},
    async buscarTreinadores(val, update) {
      let data = {
        filter: val,
        page: this.pagination.page,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        ...this.pagination,
      };
      var response = await this.metodoExecutar({
        url: "user/coach",
        method: "get",
        params: data,
      });
      if (
        (response.status >= 200 && response.status <= 300) ||
        response.status == 201
      ) {
        this.treinadoresOptions = response.data.coaches;
      }
      if (update) update();
    },
    async alterar() {
      this.$q.loading.show();
      let response = await this.metodoExecutar({
        url: "updateCoach",
        method: "put",
        params: {
          treinadorAntigo: this.treinadorAtual.id,
          novoTreinador: this.newCoach.id,
          equipe_id: this.equipe.id,
        },
      });
      if (response.status === 200 || response.status == 201) {
        this.$router.push("/equipes/show/" + this.equipe.id);
        this.$q.notify({
          message: "Treinador alterado com sucesso.",
          type: "positive",
        });
      } else {
        this.metodoRespostaErro(response);
      }
      this.modalKanban = false;
      this.$q.loading.hide();
    },
    async salvar() {
      this.$q.loading.show();
      this.modalKanban = false;
      this.$q.loading.hide();
    },
  },
};
</script>

<style></style>
