<template>
	<div>
		<q-form @submit="onSubmit" @reset="onReset" class="grid-perfil q-gutter-md" ref="form">
			<botoes-topo-edicao :opcoes="{ voltar: true, editar: true, salvar: true, remover: true}" :visualizando="isShow" @acaoBotao="acaoBotaoTopo" class="grid-a" />

			<q-card class="grid-b">
				<q-card-section>
					<div class="text-secondary text-h6 q-mb-md">
						<q-icon name="far fa-check-square" left />
						Equipe
					</div>
					<div class="row q-col-gutter-sm">
						<div class="col-xs-12">
							<q-input v-model="equipe.nome" :rules="[validadorRequerido]" label="Nome*" maxlength="80" :readonly="isShow"  :outlined="!isShow" dense></q-input>
						</div>
					</div>
				</q-card-section>
			</q-card>

			<q-card class="grid-d" v-if="!isShow">
				<q-card-section class="row justify-between items-center text-grey-6">
					<div>* Campos obrigatórios</div>
				</q-card-section>
				<q-card-section>
					<div class="q-col-gutter-md">
						<div v-if="!isShow" class="btn-responsivo">
							<q-btn class="full-width" label="Cancelar" icon="fas fa-times" type="reset" color="primary" outline no-caps></q-btn>
						</div>
						<div v-if="!isShow" class="btn-responsivo">
							<q-btn class="full-width" label="Salvar" icon="fas fa-save" type="submit" color="primary" no-caps></q-btn>
						</div>
					</div>
				</q-card-section>
			</q-card>
		</q-form>
	</div>
</template>
<script>
import { validadorRequerido } from 'src/services/validador'
import { metodoRespostaErro } from 'src/services/funcoes'
import BotoesTopoEdicao from 'src/components/BotoesTopoEdicao.vue'
export default {
	components: { BotoesTopoEdicao },
	data() {
		return {
			isShow: false,
			equipe: {
				nome: '',
			},
			numeroColunas: 3
		}
	},
	watch: {
		'this.$route.path'() {
			this.isShow = this.$route.meta.isShow
		}
	},
	computed: {
		tamanhoColuna() {
			switch (this.numeroColunas) {
				case 1:
					return 'col-12'
				case 2:
					return 'col-6'
				case 3:
					return 'col-4'
				case 4:
					return 'col-3'
			}
		}
	},
	methods: {
		metodoRespostaErro,
		validadorRequerido,
		acaoBotaoTopo(acao) {
			switch (acao) {
				case 'novo':
					this.$router.push('/equipes/edit')
					break
				case 'remover':
					this.removerEquipe()
					break
				case 'editar':
					this.$router.push('/equipes/edit/' + this.equipe.id)
					break
				case 'salvar':
					this.$refs.form.submit()
					break
				case 'cancelar':
				case 'voltar':
					this.$refs.form.reset()
					break
			}
		},
		onResize(size) {
			if (size.width > 1600) this.numeroColunas = 4
			else if (size.width > 1100) this.numeroColunas = 3
			else if (size.width <= 1100 && size.width > 800) this.numeroColunas = 2
			else if (size.width <= 800) this.numeroColunas = 1
		},
		async onSubmit() {
			let p = { ...this.equipe }
			this.$q.loading.show()
			p.usuario_id = this.getUsuarioLogado.id
			var response = await this.metodoExecutar({ url: 'team' + (this.equipe.id ? '/' + this.equipe.id : ''), method: this.equipe.id ? 'put' : 'post', data: p })
			if (response.status === 200 || response.status == 201) {
				this.$router.push('/equipes/show/' + response.data.id)
				this.$q.notify({ message: 'Equipe salva com sucesso.', type: 'positive' })
			} else this.metodoRespostaErro(response)
			this.$q.loading.hide()
		},
		onReset() {
			if (!this.isShow && this.equipe.id) {
				this.$router.push('/equipes/show/' + this.equipe.id)
				this.isShow = true
			} else this.$router.push('/equipes')
		},
		removerEquipe() {
			this.$q.dialog({ title: 'Confirmação', message: 'Você tem certeza que deseja excluir esta equipe? Essa ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				var response = await this.metodoExecutar({ url: 'api/equipes/' + this.equipe.id, method: 'delete' })
				if (response.status === 200 || response.status == 201) {
					this.$q.notify({ message: 'Equipe removida com sucesso.', type: 'positive' })
					this.$router.push('/equipes')
				} else this.metodoRespostaErro(response)
			})
		},
		classeColuna(numero) {
			return this.numeroColunas >= numero ? this.tamanhoColuna : ''
		},
		marcarDesmarcar(marcar, itens) {
			if (itens.constructor.name == 'Array') for (let item of itens) for (let idx in item.permissions) item.permissions[idx].marcado = marcar
			else for (let idx in itens) itens[idx].marcado = marcar
		}
	},
	async created() {
		this.isShow = this.$route.meta.isShow
		if (this.$route.params.id !== undefined) {
			let response = await this.metodoExecutar({ url: 'team/' + this.$route.params.id, method: 'get' })
			console.log('response', response)
			if (response.status === 200 || response.status === 201) {
				this.equipe = response.data
				
			} else{
				this.$q.notify({ message: 'Equipe não encontrada.', type: 'negative' })
				this.$router.push('/equipes')
			} 
		} else{
			
		}
	}
	
}
</script>
<style lang="sass">
@media (min-width: 700px) and (max-width: 1000px)
	.grid-perfil
		display: grid
		grid-template-areas: "a a" "b b" "d d"
		grid-template-columns: 6fr 4fr
@media (min-width: 1001px) and (max-width: 1200px)
	.grid-perfil
		display: grid
		grid-template-areas: "a a" "b b" "d d"
		grid-template-columns: 6fr 4fr
@media (min-width: 1201px)
	.grid-perfil
		display: grid
		grid-template-areas: "a a" "b b" "d d"
		grid-template-columns: 6fr 2fr
.grid-perfil-full-width
	grid-column-start: 1
	grid-column-end: 3
.circle
	width: 24px
	height: 24px
	border-radius: 100%
.div-botao
	position: absolute
	top: 20px
	right: 15px
</style>
