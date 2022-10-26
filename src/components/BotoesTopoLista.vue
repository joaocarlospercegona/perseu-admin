<template>
	<q-card>
		<q-card-section>
			<div class="row items-center q-col-gutter-md">
				<div class="col q-gutter-md">
					<div v-if="opcoesPadroes.novo" class="btn-responsivo">
						<q-btn class="full-width" label="Novo" icon="fas fa-plus" color="primary" no-caps @click="acaoBotao('novo')" data-v-step="btn_topo_lista_novo"></q-btn>
					</div>
					<div v-if="opcoesPadroes.exportar" class="btn-responsivo">
						<q-btn class="full-width" label="Exportar" icon="fas fa-file-export" color="primary" no-caps @click="acaoBotao('exportar')"></q-btn>
					</div>
					<div v-if="botaoOrcamentos" class="btn-responsivo">
						<q-btn class="full-width" label="Exibir Orçamentos" icon="fas fa-align-justify" color="primary" no-caps @click="acaoBotao('abrirOrcamentos')"></q-btn>
					</div>
					<div v-for="(botao, index) of botoesPersonalizados" :key="'botaoPersonalizadoLista' + index" class="btn-responsivo">
						<q-btn class="full-width" :label="botao.texto" :icon="botao.icone" color="primary" no-caps @click="acaoBotao(botao.acao)"></q-btn>
					</div>
				</div>
				<q-space></q-space>
				<div v-if="opcoesPadroes.pesquisa" :class="tamanhoPesquisa">
					<q-input v-model="search" placeholder="Pesquisar" @update:modelValue="pesquisar" debounce="400" dense outlined>
						<template v-slot:append>
							<q-icon name="fas fa-search" color="primary" />
						</template>
					</q-input>
				</div>
				<slot name="maisCampos" />
			</div>
		</q-card-section>
	</q-card>
</template>
<script>
export default {
	props: {
		opcoes: {
			type: Object,
			default: () => {
				return {}
			}
		},
		botaoOrcamentos: {
			type: Boolean,
			required: true
		},
		opcoesExtras: {
			type: Object,
			default: () => {
				return {}
			}
		},
		botoesPersonalizados: {
			type: Array,
			validator: (val) => {
				for (let botao of val) {
					if (!botao.icone || !botao.texto || !botao.acao) {
						return false
					}
				}
				return true
			}
		},
		tamanhoPesquisa: {
			type: String,
			default: () => {
				return 'col-lg-3 col-md-4 col-xs-12'
			}
		}
	},
	data() {
		return {
			search: '',
			opcoesPadroes: {
				novo: true,
				exportar: false,
				pesquisa: true
			},
			mostrarMaisCampos: false
		}
	},
	methods: {
		acaoBotao(acao) {
			this.$emit('acaoBotao', acao)
		},
		pesquisar() {
			this.$emit('pesquisar', this.search)
		}
	},
	watch: {
		opcoes() {
			if (this.opcoes) for (let item in this.opcoes) if (this.opcoesPadroes[item] !== undefined) this.opcoesPadroes[item] = this.opcoes[item]
		}
	},
	created() {
		
		if (this.opcoes) for (let item in this.opcoes) if (this.opcoesPadroes[item] !== undefined) this.opcoesPadroes[item] = this.opcoes[item]
	}
}
</script>
