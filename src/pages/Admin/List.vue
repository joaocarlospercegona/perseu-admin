<template>
  <q-page class="padding-page">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="$route.path == '/admins'" class="q-gutter-y-md" key="list">
        <botoes-topo-lista
          :opcoes="{ novo: true, opcoesPadroes: false, pesquisa: false }"
          @acaoBotao="acaoBotaoTopo"
          @pesquisar="pesquisar"
        />

        <q-table
          class="sticky-header-table"
          :rows="admins"
          :columns="adminsColumns"
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
                @click="showAdmin(props.row.id)"
              >
                <q-tooltip>Mostrar</q-tooltip>
              </q-btn>
              <q-btn
                icon="fas fa-trash"
                color="primary"
                flat
                dense
                @click="removerAdmin(props.row.id)"
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
import AdminController from "src/Controller/AdminController";
import BotoesTopoLista from "src/components/BotoesTopoLista.vue";
export default {
  components: { BotoesTopoLista },
  mixins: [AdminController],
  data() {
    return {
      search: "",
      admins: [],
      adminsColumns: [
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "left",
          style: "width: 100px",
        },
        { name: "email", label: "Email", field: "email", align: "left" },
      ],
      pagination: {
        sortBy: "email",
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
          this.$router.push("/admins/edit");
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
        filter: this.search,
        page: this.pagination.page,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        ...this.pagination,
      };
      this.admins = await this.buscarAdmins(data);
      this.$q.loading.hide();
    },
    adicionarCliente() {
      this.$router.push("/admins/edit");
    },
    editarAdmin(id) {
      this.$router.push("/admins/edit/" + id);
    },

    async removerAdmin(id) {
      this.$q
        .dialog({
          title: "Confirmação",
          message:
            "Tem certeza que deseja remover este Admin? Esta ação é irreversível.",
          ok: "Sim",
          cancel: "Não",
        })
        .onOk(async () => {
          await this.excluirAdmin(id);
          this.buscar();
        });
    },
    showAdmin(id) {
      this.$router.push("/admins/show/" + id);
    },
  },
  async created() {
    await this.buscar();
  },
};
</script>
<style lang="sass"></style>
