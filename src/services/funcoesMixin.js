export const estadoOptions = {
  computed: {
    estadoOptions() {
      return [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ];
    },
  },
};

export const siglaConselhoOptions = {
  computed: {
    siglaConselhoOptions() {
      return [
        "CRAS",
        "COREN",
        "CRF",
        "CREFITO",
        "CRM",
        "CRV",
        "CRN",
        "CRO",
        "CRP",
        "CRFA",
        "OUT",
      ];
    },
  },
};

export const simNaoOptions = {
  computed: {
    simNaoOptions() {
      return [
        { label: "Sim", value: true },
        { label: "Não", value: false },
      ];
    },
  },
};

export const tarefaConcluidaOptions = {
  computed: {
    tarefaConcluidaOptions() {
      return [
        { label: "Concluída", value: true },
        { label: "Pendente", value: false },
      ];
    },
  },
};

export const sexoOptions = {
  computed: {
    sexoOptions() {
      return ["Feminino", "Masculino"];
    },
  },
};

export const estadoCivilOptions = {
  computed: {
    estadoCivilOptions() {
      return ["Casado(a)", "Solteiro(a)", "Viúvo(a)", "Divorciado(a)"];
    },
  },
};

export const tipoAtendimentoTipoOptions = {
  computed: {
    tipoAtendimentoTipoOptions() {
      return [
        "Alternativas",
        "Arquivo",
        "Captura",
        "CID",
        "Convênio",
        "Data",
        "Data e Hora",
        "Execução de Procedimentos",
        "Fórmula",
        "Hora",
        "Número",
        "Profissional",
        "Requisição de Procedimentos",
        "Resultado de Procedimentos",
        "Seção",
        "Texto",
        "Texto Longo",
        "Tipo de Atendimento",
      ];
    },
  },
};

export const campoTipoOptions = {
  computed: {
    campoTipoOptions() {
      return [
        "Alternativas",
        "Data",
        "Número",
        "Seção",
        "Texto Curto",
        "Texto Longo",
      ];
    },
  },
};

export const campoLocalOptions = {
  computed: {
    campoLocalOptions() {
      return ["Convênios", "Pacientes", "Profissionais", "Usuários"];
    },
  },
};

export const assistenteTipoOptions = {
  computed: {
    assistenteTipoOptions() {
      return ["Descritivo", "Em Tópicos"];
    },
  },
};

export const acaoOptions = {
  computed: {
    acaoOptions() {
      return [
        { label: "Visualização", value: "2" },
        { label: "Inclusão", value: "5" },
        { label: "Alteração", value: "4" },
        { label: "Exclusão", value: "3" },
      ];
    },
  },
};
export const editorToolbarPadrao = {
  computed: {
    editorToolbarPadrao() {
      return [
        ["alinhamento"],
        ["bold", "italic", "strike", "underline", "subscript", "superscript"],
        ["token", "hr", "custom_btn"],
        ["tamanho", "fonte", "removeFormat"],
        ["unordered", "ordered", "outdent", "indent"],
        ["undo", "redo"],
        ["viewsource"],
        ["cor"],
        ["paciente", "profissional", "agendamento"],
      ];
    },
  },
};

export const editorFontesPadrao = {
  computed: {
    editorFontesPadrao() {
      return {
        arial: "Arial",
        arial_black: "Arial Black",
        comic_sans: "Comic Sans MS",
        courier_new: "Courier New",
        impact: "Impact",
        lucida_grande: "Lucida Grande",
        times_new_roman: "Times New Roman",
        verdana: "Verdana",
      };
    },
  },
};

export const codigoDespesaOptions = {
  computed: {
    codigoDespesaOptions() {
      return [
        { label: "Gazes medicinais", value: "1" },
        { label: "Medicamentos", value: "2" },
        { label: "Materiais", value: "3" },
        { label: "Taxas diversas", value: "4" },
        { label: "Diárias", value: "5" },
        { label: "Aluguéis", value: "6" },
        { label: "Taxas e Aluguéis", value: "7" },
        { label: "OPME", value: "8" },
      ];
    },
  },
};

export const unidadeMedidaDespesaOptions = {
  computed: {
    unidadeMedidaDespesaOptions() {
      return [
        { label: "001-AMP", value: "001" },
        { label: "002-BUI", value: "002" },
        { label: "003-BG", value: "003" },
        { label: "004-BOLS", value: "004" },
        { label: "005-CX", value: "005" },
        { label: "006-CAP", value: "006" },
        { label: "007-CARP", value: "007" },
        { label: "008-COM", value: "008" },
        { label: "009-DOSE", value: "009" },
        { label: "010-DRG", value: "010" },
        { label: "011-ENV", value: "011" },
        { label: "012-FLAC", value: "012" },
        { label: "013-FR", value: "013" },
        { label: "014-FA", value: "014" },
        { label: "015-GAL", value: "015" },
        { label: "016-GLOB", value: "016" },
        { label: "017-GTS", value: "017" },
        { label: "018-G", value: "018" },
        { label: "019-L", value: "019" },
        { label: "020-MCG", value: "020" },
        { label: "021-MUI", value: "021" },
        { label: "022-MG", value: "022" },
        { label: "023-ML", value: "023" },
        { label: "024-OVL", value: "024" },
        { label: "025-PAS", value: "025" },
        { label: "026-LT", value: "026" },
        { label: "027-PER", value: "027" },
        { label: "028-PIL", value: "028" },
        { label: "029-PT", value: "029" },
        { label: "030-KG", value: "030" },
        { label: "031-SER", value: "031" },
        { label: "032-SUP", value: "032" },
        { label: "033-TABLE", value: "033" },
        { label: "034-TUB", value: "034" },
        { label: "035-TB", value: "035" },
        { label: "036-UN", value: "036" },
        { label: "037-UI", value: "037" },
        { label: "038-CM", value: "038" },
        { label: "039-CONJ", value: "039" },
        { label: "040-KIT", value: "040" },
        { label: "041-MÇ", value: "041" },
        { label: "042-M", value: "042" },
        { label: "043-PC", value: "043" },
        { label: "044-PÇ", value: "044" },
        { label: "045-RL", value: "045" },
        { label: "046-GY", value: "046" },
        { label: "047-CGY", value: "047" },
        { label: "048-PAR", value: "048" },
        { label: "049-ADES", value: "049" },
        { label: "050-COM EFEV", value: "050" },
        { label: "051-COM MST", value: "051" },
        { label: "052-SACHE", value: "052" },
      ];
    },
  },
};

export const indicacaoAcidenteOptions = {
  computed: {
    indicacaoAcidenteOptions() {
      return [
        { label: "Trabalho", value: "0" },
        { label: "Trânsito", value: "1" },
        { label: "Outros", value: "2" },
        { label: "Não acidente", value: "9" },
      ];
    },
  },
};

export const tipoConsultaOptions = {
  computed: {
    tipoConsultaOptions() {
      return [
        { label: "Primeira", value: "1" },
        { label: "Retorno", value: "2" },
        { label: "Pré-Natal", value: "3" },
        { label: "Por encaminhamento", value: "4" },
      ];
    },
  },
};

export const caraterAtendimentoOptions = {
  computed: {
    caraterAtendimentoOptions() {
      return [
        { label: "Eletiva", value: "1" },
        { label: "Urgência", value: "2" },
      ];
    },
  },
};

export const tipoAtendimentoOptions = {
  computed: {
    tipoAtendimentoOptions() {
      return [
        { label: "Remoção", value: "01" },
        { label: "Pequena Cirurgia", value: "02" },
        { label: "Outras Terapias", value: "03" },
        { label: "Consulta", value: "04" },
        { label: "Exame Ambulatorial", value: "05" },
        { label: "Atendimento Domiciliar", value: "06" },
        { label: "Internação", value: "07" },
        { label: "Quimioterapia", value: "08" },
        { label: "Radioterapia", value: "09" },
        { label: "Terapia Renal Substitutiva", value: "10" },
        { label: "Pronto Socorro", value: "11" },
        { label: "Ocupacional", value: "12" },
        { label: "Pequeno atendimento (sutura, gesso e outros)", value: "13" },
      ];
    },
  },
};

export const motivoEncerramentoAtendimentoOptions = {
  computed: {
    motivoEncerramentoAtendimentoOptions() {
      return [
        {
          label:
            "Óbito com declaração de óbito fornecida pelo médico assistente",
          value: "41",
        },
        {
          label:
            "Óbito com declaração de Óbito fornecida pelo Instituto Médico Legal - IML",
          value: "42",
        },
        {
          label:
            "Óbito com declaração de Óbito fornecida pelo Serviço de Verificação de Óbito - SVO.",
          value: "43",
        },
      ];
    },
  },
};

export const grauParticipacaoOptions = {
  computed: {
    grauParticipacaoOptions() {
      return [
        { label: "Cirurgião", value: "00" },
        { label: "Primeiro Auxiliar", value: "01" },
        { label: "Segundo Auxiliar", value: "02" },
        { label: "Terceiro Auxiliar", value: "03" },
        { label: "Quarto Auxiliar", value: "04" },
        { label: "Instrumentador", value: "05" },
        { label: "Anestesista", value: "06" },
        { label: "Auxiliar de Anestesista", value: "07" },
        { label: "Consultor", value: "08" },
        { label: "Perfusionista", value: "09" },
        { label: "Pediatra na sala de parto", value: "10" },
        { label: "Auxiliar SADT", value: "11" },
        { label: "Clínico", value: "12" },
        { label: "Intensivista", value: "13" },
        { label: "Saúde Ocupacional - Periódico", value: "16" },
      ];
    },
  },
};

export const viaAcessoOptions = {
  computed: {
    viaAcessoOptions() {
      return [
        { label: "Única", value: "1" },
        { label: "Mesma Via", value: "2" },
        { label: "Diferentes Vias", value: "3" },
      ];
    },
  },
};

export const tecnicaUtilizadaOptions = {
  computed: {
    tecnicaUtilizadaOptions() {
      return [
        { label: "Convencional", value: "1" },
        { label: "Vídeo", value: "2" },
        { label: "Robótica", value: "3" },
      ];
    },
  },
};

export const tipoGuiaOptions = {
  computed: {
    tipoGuiaOptions() {
      return [
        { label: "Consulta", value: "1" },
        { label: "SP/SADT", value: "2" },
      ];
    },
  },
};

export const statusFaturaOptions = {
  computed: {
    statusFaturaOptions() {
      return ["Paga", "Parcial", "Pendente"];
    },
  },
};

export const tipoCodigoPrestadorOptions = {
  computed: {
    tipoCodigoPrestadorOptions() {
      return [
        { label: "Código", value: "1" },
        { label: "CNPJ", value: "2" },
        { label: "CPF", value: "3" },
      ];
    },
  },
};

export const tipoCodigoProfissionalOptions = {
  computed: {
    tipoCodigoProfissionalOptions() {
      return [
        { label: "Código", value: "1" },
        { label: "CPF", value: "3" },
      ];
    },
  },
};

export const versaoFaturaXmlOptions = {
  computed: {
    versaoFaturaXmlOptions() {
      return ["3.05.00"];
    },
  },
};
