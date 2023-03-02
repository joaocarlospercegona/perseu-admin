export default {
  methods: {
    async buscarAtletas(data) {
      var response = await this.metodoExecutar({
        url: "user/athlete",
        method: "get",
        params: data,
      });
      if (response.status === 200 || response.status == 201) {
        this.pagination.rowsNumber = parseInt(response.data.count);
        return response.data.athletes;
      }
    },
    async buscarAtleta(id) {
      let response = await this.metodoExecutar({
        url: "admin/athlete/" + id,
        method: "get",
      });
      if (response.status === 200 || response.status == 201) {
        if (response.data.user) {
          response.data.email = response.data.user.email;
        }
        if (response.data.deletedAt) {
          response.data.active = false;
        } else response.data.active = true;
        response.data.birthdate = this.formatarDataHora(
          response.data.birthdate,
          "DD/MM/YYYY"
        );
        if (response.data.status == "ATHLETE_WITH_TEAM") {
          let team = await this.metodoExecutar({
            url: "athlete/" + id + "/request",
            method: "get",
          });
          if (team.status == 200 || team.status == 201) {
            response.data.equipe = team.data.team.name;
          }
        }
        return response.data;
      }
    },
    async desativarAtleta(id) {
      var response = await this.metodoExecutar({
        url: "athlete/" + id,
        method: "delete",
      });
      if (response.status === 200 || response.status == 201) {
        this.$q.notify({
          message: "Atleta desativado com sucesso",
          type: "positive",
        });
        this.$router.push("/atletas");
      } else
        this.$q.notify({
          message: response.data.message,
          type: "negative",
        });
    },
  },
};
