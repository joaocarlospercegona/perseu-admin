import { metodoRespostaErro } from "src/services/funcoes";
export default {
  methods: {
    metodoRespostaErro,
    async buscarEquipes(data) {
      var response = await this.metodoExecutar({
        url: "team",
        method: "get",
        data: data,
      });
      if (response.status === 200 || response.status == 201) {
        this.pagination.rowsNumber = parseInt(response.data.length);
        return response.data;
      }
    },
    async buscarEquipe(id) {
      let response = await this.metodoExecutar({
        url: "team/" + id,
        method: "get",
      });
      if (response.status === 200 || response.status === 201) {
        response.data.criadaEm = this.formatarDataHora(
          response.data.createdAt,
          "YYYY-MM-DD",
          "DD/MM/YYYY"
        );
        if (response.data.coach) {
          response.data.treinador = response.data.coach.name;
        }
        let response2 = await this.metodoExecutar({
          url: `team/${response.data.id}/athletes`,
        });
        if (response2.status == 200 || response2.status == 201) {
          response.data.quantidadeAtletas = response2.data.length;
          response.data.atletas = response2.data;
        }
        let response3 = await this.metodoExecutar({
          url: `team/${response.data.id}/request`,
        });
        if (response3.status == 200 || response3.status == 201) {
          response.data.quantidadeAtletasPendentes = response3.data.length;
          response.data.atletasPendentes = response3.data;
        }
        if (response.data.atletas && response.data.atletas.length > 0)
          for (let atleta of response.data.atletas) {
            atleta.idade = this.buscarIdade(atleta.birthdate);
          }
        if (
          response.data.atletasPendentes &&
          response.data.atletasPendentes.length > 0
        )
          for (let atleta of response.data.atletasPendentes) {
            atleta.birthdate = this.formatarDataHora(
              atleta.athlete.birthdate,
              "YYYY-MM-DD",
              "DD/MM/YYYY"
            );
            atleta.idade = this.buscarIdade(atleta.athlete.birthdate);
          }
        return response.data;
      } else {
        this.$q.notify({ message: "Equipe não encontrada.", type: "negative" });
        this.$router.push("/equipes");
      }
    },
    async desativarEquipe(id) {
      console.log("id", id);
      var response = await this.metodoExecutar({
        url: "team/" + id,
        method: "delete",
      });
      if (response.status === 200 || response.status == 201) {
        this.$q.notify({
          message: "Equipe removida com sucesso.",
          type: "positive",
        });
        this.$router.push("/equipes");
      } else this.metodoRespostaErro(response);
    },
  },
};
