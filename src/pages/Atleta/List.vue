<template>
  <q-page class="padding-page">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="$route.path == '/atletas'" class="q-gutter-y-md" key="list">
        <botoes-topo-lista
          :opcoes="{ novo: false, opcoesPadroes: false }"
          @acaoBotao="acaoBotaoTopo"
          @pesquisar="pesquisar"
        />

        <q-table
          class="sticky-header-table"
          :rows="atletas"
          :columns="atletasColumns"
          align="left"
          row-key="id"
          @request="buscar"
          @update:pagination="(v) => buscar()"
          :rows-per-page-options="[5, 10, 25, 50, 100]"
          :pagination-label="paginationLabel"
          binary-state-sort
          :pagination.sync="pagination"
          wrap-cells
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="fas fa-eye"
                color="primary"
                flat
                dense
                @click="showAtleta(props.row.id)"
              >
                <q-tooltip>Mostrar</q-tooltip>
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
      atletas: [],
      atletasColumns: [
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "left",
          style: "width: 100px",
        },
        { name: "name", label: "Nome", field: "name", align: "left" },
        { name: "email", label: "Email", field: "email", align: "left" },
        { name: "team", label: "Equipe", field: "team", align: "left" },
      ],
      pagination: {
        sortBy: "nome",
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0,
      },
    };
  },
  methods: {
    acaoBotaoTopo(acao) {
      switch (acao) {
        case "novo":
          this.$router.push("/atletas/edit");
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
      this.$q.loading.show();
      if (props) {
        this.pagination.page = props.pagination.page;
        this.pagination.rowsPerPage = props.pagination.rowsPerPage;
        this.pagination.sortBy = props.pagination.sortBy;
        this.pagination.descending = props.pagination.descending;
      }
      let data = {
        search: this.search,
        page: this.pagination.page,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        ...this.pagination,
      };
      var response = await this.metodoExecutar({
        url: "user/athlete",
        method: "get",
        params: data,
      });
      if (response.status === 200 || response.status == 201) {
        this.pagination.rowsNumber = parseInt(response.data.count);
        this.atletas = response.data.athletes;
      }
      this.$q.loading.hide();
    },
    adicionarCliente() {
      this.$router.push("/atletas/edit");
    },
    editarAtleta(id) {
      this.$router.push("/atletas/edit/" + id);
    },

    removerAtleta(id) {},
    showAtleta(id) {
      this.$router.push("/atletas/show/" + id);
    },
  },
  async created() {
    await this.buscar();
  },
};
</script>
<style lang="sass"></style>
