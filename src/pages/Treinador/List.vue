<template>
  <q-page class="padding-page">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="$route.path == '/treinadores'"
        class="q-gutter-y-md"
        key="list"
      >
        <botoes-topo-lista
          :opcoes="{ novo: false, opcoesPadroes: false }"
          @acaoBotao="acaoBotaoTopo"
          @pesquisar="pesquisar"
        />

        <q-table
          class="sticky-header-table"
          :rows="perfis"
          :columns="perfisColumns"
          align="left"
          row-key="id"
          @request="buscar"
          :rows-per-page-options="[5, 10, 25, 50, 100]"
          :pagination-label="paginationLabel"
          binary-state-sort
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="fas fa-edit"
                color="primary"
                flat
                dense
                @click="editarCliente(props.row.id)"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
              <q-btn
                icon="fas fa-eye"
                color="primary"
                flat
                dense
                @click="showCliente(props.row.id)"
              >
                <q-tooltip>Mostrar</q-tooltip>
              </q-btn>
              <q-btn
                icon="fas fa-trash"
                color="primary"
                flat
                dense
                @click="removerCliente(props.row.id)"
              >
                <q-tooltip>Excluir</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
      <router-view v-else key="router-view"></router-view>
    </transition>
  </q-page>
</template>
<script>
import BotoesTopoLista from "src/components/BotoesTopoLista.vue";
export default {
  components: { BotoesTopoLista },
  data() {
    return {
      search: "",
      perfis: [],
      perfisColumns: [
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "left",
          style: "width: 100px",
        },
        { name: "nome", label: "Nome", field: "nome", align: "left" },
      ],
      pagination: {
        sortBy: "nome",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
    };
  },
  methods: {
    acaoBotaoTopo(acao) {
      switch (acao) {
        case "novo":
          this.$router.push("/treinadores/edit");
          break;
      }
    },
    pesquisar(search) {
      this.search = search;
      this.buscar();
    },
    paginationLabel(first, end, total) {
      return "Registros " + first + " até " + end + " de " + total;
    },
    async buscar(props) {
      return;
      this.$q.loading.show();
      if (props) {
        this.pagination.page = props.pagination.page;
        this.pagination.rowsPerPage = props.pagination.rowsPerPage;
        this.pagination.sortBy = props.pagination.sortBy;
        this.pagination.descending = props.pagination.descending;
      }
      let data = {
        filter: this.search,
        ...this.pagination,
      };
      var response = await this.metodoExecutar({
        url: "api/treinadores/buscar",
        method: "get",
        params: data,
      });
      if (response.status === 200 || response.status == 201) {
        this.pagination.rowsNumber = parseInt(response.data.length);
        this.perfis = response.data;
      }
      this.$q.loading.hide();
    },
    adicionarCliente() {
      this.$router.push("/treinadores/edit");
    },
    editarCliente(id) {
      this.$router.push("/treinadores/edit/" + id);
    },
    async criarLog(log) {
      this.$q.loading.show();
      var response = await this.metodoExecutar({
        url: "api/logs/criar",
        method: "post",
        data: log,
      });
      if (response.status === 200 || response.status == 201) {
      }
      this.$q.loading.hide();
    },
    removerCliente(id) {
      this.$q
        .dialog({
          title: "Confirmação",
          message:
            "Tem certeza que deseja remover esta categoria? Esta ação é irreversível.",
          ok: "Sim",
          cancel: "Não",
        })
        .onOk(async () => {
          var response = await this.metodoExecutar({
            url: "api/treinadores/" + id + "/" + this.getUsuarioLogado.id,
            method: "delete",
          });
          if (response.status === 200 || response.status == 201) {
            let log = {
              usuario_id: this.getUsuarioLogado.id,
              data_hora: new Date(),
              acao: "Removendo Categoria de Pessoa " + response.data.nome,
              codigo: 3,
              alteracoes: {
                dominio: null,
                ...response.data,
              },
            };
            this.criarLog(log);
            this.$q.notify({
              message: "Categoria removida com sucesso",
              type: "positive",
            });
            this.buscar();
          } else this.metodoRespostaErro(response);
        });
    },
    showCliente(id) {
      this.$router.push("/treinadores/show/" + id);
    },
  },
  async created() {
    console.log("fudeu");
    //await this.buscar()
  },
};
</script>
<style lang="sass"></style>
