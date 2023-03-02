export default {
  methods: {
    async buscarTreinadores(data) {
      var response = await this.metodoExecutar({
        url: "user/coach",
        method: "get",
        params: data,
      });
      if (response.status === 200 || response.status == 201) {
        this.pagination.rowsNumber = parseInt(response.data.count);
        return response.data.coaches;
      }
    },
    async buscarTreinador(id) {
      let response = await this.metodoExecutar({
        url: "coach/" + id,
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
        response.data.team_name = "";
        if (response.data.team)
          response.data.team_name = response.data.team.name;
        return response.data;
      } else {
        this.$router.push("/treinadores");
      }
    },
  },
};
