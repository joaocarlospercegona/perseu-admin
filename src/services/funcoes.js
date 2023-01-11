import { mapGetters } from "vuex";
import moment from "moment";

import { uuid } from "vue-uuid";
import jsonpAdapter from "axios-jsonp";

export const esperarUmTempo = function (tempo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, tempo);
  });
};

export const iframeImpressaoPadrao = function (html) {
  let elemento = document.getElementById("iframe-impressao-padrao");
  elemento.srcdoc = html;
  setTimeout(() => {
    elemento.contentWindow.print();
  }, 500);
};

export const formatarPerfis = function (p) {
  let p1 = "";
  for (let item of p) p1 += (p1 === "" ? "" : ", ") + item.name;
  return p1;
};

export const getUuid = function () {
  return uuid.v1();
};

export const erroCarregandoAvatar = function (event) {
  event.target.src = "images/avatar.png";
};

export const erroCarregandoArquivo = function (event) {
  event.target.src = "images/sem-imagem.png";
};
export const metodoRespostaErro = function (response) {
  if (!response)
    this.$q.notify({
      message: "Não foi possível executar a solicitação!",
      type: "negative",
    });
  else if (response.data.erros)
    this.$q.notify({
      message: response.data.erros,
      type: "negative",
      html: true,
    });
  else if (response.data.error)
    this.$q.notify({
      message: response.data.message
        ? response.data.message.toString()
        : response.data.error.e || "",
      type: "negative",
      html: true,
    });
  else if (response.data.length > 0) {
    let m = "";
    for (let item of response.data)
      m += (m === "" ? "" : "<br>") + item.message;
    this.$q.notify({
      message: m.replace(/\n/g, "<br>"),
      type: "negative",
      html: true,
    });
  } else
    this.$q.notify({
      message: "Não foi possível executar a solicitação!",
      type: "negative",
    });
};

export const efetuarLogout = async function () {
  await this.$store.commit("limparStore");
  delete this.$axios.defaults.headers.common["Authorization"];
};

export const getMoment = function () {
  return moment;
};

export const formatarDataHora = function (d, f1, f2) {
  if (!d) return "";
  return f2 ? moment(d, f1).format(f2) : moment(d).format(f1);
};

export const formatarValorMilhar = function (v, moeda) {
  let v1 = parseFloat(v || 0)
    .toFixed(2)
    .replace(".", ",")
    .split(",");
  let v2 = "";
  let negativo = v1[0][0] === "-";
  v1[0] = v1[0].replace(/\D/g, "");
  let j = 1;
  for (let i = v1[0].length - 1; i >= 0; i--) {
    v2 = v1[0][i] + v2;
    if (j === 3 && i !== 0) {
      j = 0;
      v2 = "." + v2;
    }
    j++;
  }
  return (
    (moeda === undefined ? "R$ " : "") +
    (negativo ? "-" : "") +
    v2 +
    "," +
    v1[1]
  );
};
