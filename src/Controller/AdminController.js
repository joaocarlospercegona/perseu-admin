export default {
  methods: {
    async buscarAdmins(data) {
      var response = await this.metodoExecutar({
        url: "user/admin",
        method: "get",
        params: data,
      });
      if (response.status === 200 || response.status == 201) {
        return response.data;
      }
    },
    async excluirAdmin(id) {
      var response = await this.metodoExecutar({
        url: "admin/" + id,
        method: "delete",
      });
      if (response.status === 200 || response.status == 201) {
        this.$q.notify({
          message: "Admin removido com sucesso",
          type: "positive",
        });
      } else
        this.$q.notify({
          message: response.data.message,
          type: "negative",
        });
    },
    async buscarAdmin(id) {
      let response = await this.metodoExecutar({
        url: "admin/" + id,
        method: "get",
      });
      if (response.status === 200 || response.status == 201) {
        return response.data;
      }
    },
  },
};
