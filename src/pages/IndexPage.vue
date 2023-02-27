<template>
  <q-page class="dashboard-grid">
    <q-card class="dashboard-totalizador">
      <q-card
        class="fit cursor-pointer non-selectable"
        clickable
        @click="abrirTela('treinadores')"
      >
        <q-card-section class="fit">
          <div class="fit totalizador-grid">
            <div class="totalizador-valor">{{ treinadores }}</div>
            <div class="totalizador-icone">
              <q-icon
                name="fas fa-id-badge"
                color="primary"
                size="42px"
              ></q-icon>
            </div>
            <div class="grid-2 totalizador-titulo">Treinadores</div>
          </div>
        </q-card-section>
      </q-card>
    </q-card>
    <q-card class="dashboard-totalizador">
      <q-card
        class="fit cursor-pointer non-selectable"
        clickable
        @click="abrirTela('atletas')"
      >
        <q-card-section class="fit">
          <div class="fit totalizador-grid">
            <div class="totalizador-valor">{{ atletas }}</div>
            <div class="totalizador-icone q-px-sm">
              <q-icon name="fas fa-users" color="primary" size="42px"></q-icon>
            </div>
            <div class="grid-2 totalizador-titulo">Atletas</div>
          </div>
        </q-card-section>
      </q-card>
    </q-card>
    <q-card class="dashboard-totalizador">
      <q-card
        class="fit cursor-pointer non-selectable"
        clickable
        @click="abrirTela('equipes')"
      >
        <q-card-section class="fit">
          <div class="fit totalizador-grid">
            <div class="totalizador-valor">{{ equipes }}</div>
            <div class="totalizador-icone q-px-sm">
              <q-icon
                name="fas fa-sitemap"
                color="primary"
                size="42px"
              ></q-icon>
            </div>
            <div class="grid-2 totalizador-titulo">Equipes</div>
          </div>
        </q-card-section>
      </q-card>
    </q-card>
    <q-card class="dashboard-grafico">
      <q-card class="fit">
        <q-card-section class="fit">
          <div class="text-body1 text-primary">Check-ins por Equipe:</div>

          <div
            ref="graficoAtletas"
            align="center"
            style="width: 100%; height: 100%"
          ></div>

          <q-inner-loading :showing="graficoAtletasLoading">
            <q-spinner size="50px" color="primary"></q-spinner>
          </q-inner-loading>
        </q-card-section>
      </q-card>
    </q-card>
    <q-card class="dashboard-grafico">
      <q-card class="fit">
        <q-card-section class="fit">
          <div class="text-body1 text-primary">Treinos por Equipe</div>

          <div
            ref="graficoEquipes"
            align="center"
            style="width: 100%; height: 100%"
          ></div>

          <q-inner-loading :showing="graficoEquipesLoading">
            <q-spinner size="50px" color="primary"></q-spinner>
          </q-inner-loading>
        </q-card-section>
      </q-card>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import "chartjs-adapter-date-fns";
export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      treinadores: 0,
      atletas: 0,
      equipes: 0,
      graficoAtletasLoading: false,
      graficoEquipesLoading: false,
      arrayAtletas: [],
      arrayEquipes: [],
    };
  },
  methods: {
    abrirTela(nome) {
      this.$router.push(`/${nome}`);
    },
    carregarGraficoAtletas() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Topping");
      data.addColumn("number", "Slices");

      data.addRows(this.arrayAtletas);

      var options = {
        width: 800,
        height: 400,
        pieSliceText: "label",
        pieStartAngle: 100,
      };

      var chart = new google.visualization.PieChart(this.$refs.graficoAtletas);
      chart.draw(data, options);

      this.graficoAtletasLoading = false;
    },
    carregarGraficoEquipes() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Topping");
      data.addColumn("number", "Slices");

      data.addRows(this.arrayEquipes);

      var options = {
        width: 800,
        height: 400,
        pieSliceText: "label",
        pieStartAngle: 100,
      };

      var chart = new google.visualization.PieChart(this.$refs.graficoEquipes);
      chart.draw(data, options);

      this.graficoEquipesLoading = false;
    },
  },
  async created() {
    var response = await this.metodoExecutar({
      url: "admin/entities/stats",
      method: "get",
    });
    if (response.status === 200 || response.status == 201) {
      this.treinadores = response.data.coaches;
      this.atletas = response.data.athletes;
      this.equipes = response.data.teams;
      this.arrayEquipes = [];
      if (
        response.data.trainingsByTeam &&
        response.data.trainingsByTeam.length > 0
      ) {
        for (let equipe of response.data.trainingsByTeam) {
          this.arrayEquipes.push(["" + equipe.name, parseInt(equipe.count)]);
        }
      }
      if (
        response.data.checkInsByTeam &&
        response.data.checkInsByTeam.length > 0
      ) {
        for (let equipe of response.data.checkInsByTeam) {
          this.arrayAtletas.push(["" + equipe.name, parseInt(equipe.count)]);
        }
      }

      this.carregarGraficoAtletas();
      this.carregarGraficoEquipes();
    } else if (response.data == "Invalid token") {
      await this.$store.commit("limparStore");
      delete this.$axios.defaults.headers.common["Authorization"];
      this.$route.push("/login");
    }
  },
});
</script>

<style lang="sass" scoped>
.cor-fundo
	color: $red-1
	background-color: #EF2D89
.totalizador-grid
	display: grid
	grid-template-columns: 1fr 1fr
	grid-template-rows: 6fr 4fr
	justify-content: center
	align-content: center
.totalizador-valor
	place-self: end end
	font-size: 42px
	line-height: 42px
	color: $primary
	font-weight: bold
.totalizador-icone
	place-self: end start
.totalizador-titulo
	place-self: start center
	color: $primary
.grid-2
	grid-column: auto / span 2
@media (max-width: 500px)
	dashboard-grid
		display: grid
		grid-template-columns: repeat(6, 1fr)
		gap: 8px 8px
	.dashboard-totalizador
		grid-column: auto / span 4
		min-height: 20vw
	.dashboard-grafico
		grid-column: auto / span 6
		height: 50vw
	.dashboard-tabela
		grid-column: auto / span 6
@media (max-width: 800px)
	.dashboard-grid
		display: grid
		grid-template-columns: repeat(6, 1fr)
		gap: 8px 8px
	.dashboard-totalizador
		grid-column: auto / span 1
		min-height: 20vw
	.dashboard-grafico
		grid-column: auto / span 6
		height: 50vw
	.dashboard-tabela
		grid-column: auto / span 6
@media (max-width: 1099px) and (min-width: 801px)
	.dashboard-grid
		display: grid
		grid-template-columns: repeat(6, 1fr)
		gap: 8px 8px
	.dashboard-totalizador
		grid-column: auto / span 2
		min-height: 20vw
	.dashboard-grafico
		grid-column: auto / span 6
		height: 30vw
	.dashboard-tabela
		grid-column: auto / span 6
@media (min-width: 1100px)
	.dashboard-grid
		display: grid
		grid-template-columns: repeat(6, 1fr)
		gap: 8px 8px
	.dashboard-totalizador
		grid-column: auto / span 2
		min-height: 20vw
	.dashboard-grafico
		grid-column: auto / span 3
	.dashboard-tabela
		grid-column: auto / span 3
</style>
