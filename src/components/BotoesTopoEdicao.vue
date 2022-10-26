<template>
	<div>
		<q-card>
			<q-card-section>
				<div class="q-col-gutter-md">
					<div v-if="visualizando && opcoesPadroes.voltar" class="btn-responsivo">
						<q-btn class="full-width" label="Listagem" icon="fas fa-chevron-left" color="primary" no-caps @click="acaoBotao('voltar')"></q-btn>
					</div>
					<div v-if="visualizando && opcoesPadroes.novo" class="btn-responsivo">
						<q-btn class="full-width" label="Novo" icon="fas fa-plus" color="primary" no-caps @click="acaoBotao('novo')" data-v-step="btn_topo_edicao_novo"></q-btn>
					</div>
					<div v-if="visualizando && opcoesPadroes.editar" class="btn-responsivo">
						<q-btn class="full-width" label="Editar" icon="fas fa-edit" color="primary" no-caps @click="acaoBotao('editar')"></q-btn>
					</div>
					<div v-if="visualizando && opcoesExtras.imprimir" class="btn-responsivo">
						<q-btn class="full-width" label="Imprimir" icon="fas fa-print" color="primary" no-caps @click="acaoBotao('imprimir')"></q-btn>
					</div>
					<div v-if="!visualizando && opcoesPadroes.cancelar" class="btn-responsivo">
						<q-btn class="full-width" label="Cancelar" icon="fas fa-times" color="primary" outline no-caps @click="acaoBotao('cancelar')"></q-btn>
					</div>
					<div v-if="visualizando && gerarPdf" class="btn-responsivo">
						<q-btn class="full-width" label="Imprimir" icon="fas fa-print" color="primary" no-caps @click="acaoBotao('gerarPdf')"></q-btn>
					</div>
					<div v-if="!visualizando && opcoesPadroes.salvar" class="btn-responsivo">
						<q-btn class="full-width" label="Salvar" icon="fas fa-save" color="primary" data-v-step="btn_topo_edicao_salvar" no-caps @click="acaoBotao('salvar')"></q-btn>
					</div>
					<div class="q-col-gutter-md botoes-personalizados" v-for="(botaoPersonalizado, index) in botoesPersonalizados" :key="'botaoPersonalizado' + index">
						<div v-if="botaoPersonalizado.visualizando == null || botaoPersonalizado.visualizando == visualizando" class="btn-responsivo">
							<q-btn class="full-width" :label="botaoPersonalizado.texto" :icon="botaoPersonalizado.icone" color="primary" no-caps :outline="!!botaoPersonalizado.outline" @click="acaoBotao(botaoPersonalizado.acao)"></q-btn>
						</div>
					</div>
					<div v-if="visualizando && opcoesPadroes.remover" class="btn-responsivo">
						<q-btn class="full-width" label="Excluir" icon="fas fa-trash" color="primary" outline no-caps @click="acaoBotao('remover')"></q-btn>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</div>
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
		opcoesExtras: {
			type: Object,
			default: () => {
				return {}
			}
		},
		visualizando: {
			type: Boolean,
			required: true
		},
		gerarPdf: {
			type: Boolean,
			required: true
		},
		botoesPersonalizados: {
			type: Array,
			validator: val => {
				for (let botao of val) {
					if (!botao.icone || !botao.texto || !botao.acao) {
						return false
					}
				}
				return true
			}
		}
	},
	data() {
		return {
			opcoesPadroes: {
				voltar: true,
				novo: true,
				remover: true,
				editar: true,
				cancelar: true,
				salvar: true,
				gerarPdf: true
			}
		}
	},
	methods: {
		acaoBotao(acao) {
			this.$emit('acaoBotao', acao)
		}
	},
	watch: {
		opcoes() {
			if (this.opcoes) for (let item in this.opcoes) if (this.opcoesPadroes[item] !== undefined) this.opcoesPadroes[item] = this.opcoes[item]
		}
	}
}
</script>
<style lang="sass" scoped>
.botoes-personalizados
	display: inline-block
</style>
