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
          @update:pagination="(v) => buscar()"
          :rows-per-page-options="[5, 10, 25, 50, 100]"
          :pagination-label="paginationLabel"
          binary-state-sort
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="fas fa-eye"
                color="primary"
                flat
                dense
                @click="showCoach(props.row.id)"
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
      perfis: [],
      perfisColumns: [
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
        sortBy: "name",
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
      };
      var response = await this.metodoExecutar({
        url: "user/coach",
        method: "get",
        params: data,
      });
      if (response.status === 200 || response.status == 201) {
        this.pagination.rowsNumber = parseInt(response.data.count);
        this.perfis = response.data.coaches;
      }
      this.$q.loading.hide();
    },
    adicionarCliente() {
      this.$router.push("/treinadores/edit");
    },
    editarCoach(id) {
      this.$router.push("/treinadores/edit/" + id);
    },

    deleteCoach(id) {},
    showCoach(id) {
      this.$router.push("/treinadores/show/" + id);
    },
  },
  async created() {
    await this.buscar();
  },
};
</script>
<style lang="sass"></style>
