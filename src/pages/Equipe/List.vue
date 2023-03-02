<template>
  <q-page class="padding-page">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="$route.path == '/equipes'" class="q-gutter-y-md" key="list">
        <botoes-topo-lista
          :opcoes="{ novo: false, opcoesPadroes: false }"
          @acaoBotao="acaoBotaoTopo"
          @pesquisar="pesquisar"
        />

        <q-table
          class="sticky-header-table"
          :rows="equipes"
          :columns="equipeColumns"
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
                @click="showEquipe(props.row.id)"
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
import EquipeController from "src/Controller/EquipeController";
import BotoesTopoLista from "src/components/BotoesTopoLista.vue";
export default {
  components: { BotoesTopoLista },
  mixins: [EquipeController],
  data() {
    return {
      search: "",
      equipes: [],
      equipeColumns: [
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "left",
          style: "width: 100px",
        },
        { name: "name", label: "Nome", field: "name", align: "left" },
        { name: "coach", label: "Treinador", field: "coach", align: "left" },
        { name: "code", label: "Código", field: "code", align: "left" },
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
          this.$router.push("/equipes/edit");
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
      this.equipes = await this.buscarEquipes(data);

      this.$q.loading.hide();
    },

    editarEquipe(id) {
      this.$router.push("/equipes/edit/" + id);
    },
    removerEquipe(id) {},
    showEquipe(id) {
      this.$router.push("/equipes/show/" + id);
    },
  },
  async created() {
    await this.buscar();
  },
};
</script>
<style lang="sass"></style>
