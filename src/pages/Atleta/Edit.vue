<template>
	<div>
		<q-form @submit="onSubmit" @reset="onReset" class="grid-perfil q-gutter-md" ref="form">
			<botoes-topo-edicao :opcoes="{ voltar: true, editar: this.getPermissoes && this.getPermissoes.acessos && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias') && !this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias').alterar, salvar: this.getPermissoes && this.getPermissoes.acessos && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias') && !this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias').alterar, remover: this.getPermissoes && this.getPermissoes.acessos && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias') && !this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias').excluir }" :visualizando="isShow" @acaoBotao="acaoBotaoTopo" class="grid-a" />

			<q-card class="grid-b">
				<q-card-section>
					<div class="text-secondary text-h6 q-mb-md">
						<q-icon name="far fa-check-square" left />
						Categoria de Pessoas
					</div>
					<div class="row q-col-gutter-sm">
						<div class="col-xs-12">
							<q-input v-model="categoria.nome" :rules="[validadorRequerido]" label="Nome*" maxlength="80" :readonly="isShow"  :outlined="!isShow" dense></q-input>
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
						<div v-if="!isShow && this.getPermissoes && this.getPermissoes.acessos && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias') && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias').alterar" class="btn-responsivo">
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
			categoria: {
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
					this.$router.push('/categorias/edit')
					break
				case 'remover':
					this.removerCategoria()
					break
				case 'editar':
					this.$router.push('/categorias/edit/' + this.categoria.id)
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
			let p = { ...this.categoria }
			this.$q.loading.show()
			p.usuario_id = this.getUsuarioLogado.id
			var response = await this.metodoExecutar({ url: 'api/categorias' + (this.categoria.id ? '/' + this.categoria.id : ''), method: this.categoria.id ? 'put' : 'post', data: p })
			if (response.status === 200 || response.status == 201) {

				let log = {
					usuario_id: this.getUsuarioLogado.id,
					data_hora: new Date(),
					acao: this.categoria.id ? 'Alterando dados da Categoria de Pessoa: '+this.categoria.nome : 'Criando a Categoria de Pessoa: '+this.categoria.nome,
					codigo: this.categoria.id ? 4 : 5,
					alteracoes: {
						dominio: null,
						...response.data
					}
				}
				this.criarLog(log)

				this.$router.push('/categorias/show/' + response.data.id)
				this.$q.notify({ message: 'Categoria salva com sucesso.', type: 'positive' })
			} else this.metodoRespostaErro(response)
			this.$q.loading.hide()
		},
		onReset() {
			if (!this.isShow && this.categoria.id) {
				this.$router.push('/categorias/show/' + this.categoria.id)
				this.isShow = true
			} else this.$router.push('/categorias')
		},
		removerCategoria() {
			this.$q.dialog({ title: 'Confirmação', message: 'Você tem certeza que deseja excluir esta categoria? Essa ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				var response = await this.metodoExecutar({ url: 'api/categorias/' + this.categoria.id+'/'+this.getUsuarioLogado.id, method: 'delete' })
				if (response.status === 200 || response.status == 201) {
					let log = {
						usuario_id: this.getUsuarioLogado.id,
						data_hora: new Date(),
						acao: 'Removendo Categoria de Pessoa '+this.categoria.nome,
						codigo: 3,
						alteracoes: {
							dominio: null,
							...response.data
						}
					}
					this.criarLog(log)


					this.$q.notify({ message: 'Categoria removida com sucesso.', type: 'positive' })
					this.$router.push('/categorias')
				} else this.metodoRespostaErro(response)
			})
		},
		classeColuna(numero) {
			return this.numeroColunas >= numero ? this.tamanhoColuna : ''
		},
		marcarDesmarcar(marcar, itens) {
			if (itens.constructor.name == 'Array') for (let item of itens) for (let idx in item.permissions) item.permissions[idx].marcado = marcar
			else for (let idx in itens) itens[idx].marcado = marcar
		},
		async criarLog(log){
			this.$q.loading.show()
			var response = await this.metodoExecutar({ url: 'api/logs/criar', method: 'post', data: log })
			if (response.status === 200 || response.status == 201) {
			}
			this.$q.loading.hide()
		},
	},
	async created() {
		this.isShow = this.$route.meta.isShow
		if(this.isShow){
			if(this.getPermissoes && this.getPermissoes.acessos && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias') && !this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias').visualizar){
				this.$q.notify({ message: 'Você não tem este nível de acesso.', type: 'negative' })
            	this.$router.push('/categorias')
			}
		}else{
			if(this.getPermissoes && this.getPermissoes.acessos && this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias') && !this.getPermissoes.acessos.find(ev => ev.nome == 'Categorias').alterar){
				this.$q.notify({ message: 'Você não tem este nível de acesso.', type: 'negative' })
            	this.$router.push('/categorias')
			}
		}
		if (this.$route.params.id !== undefined) {
			let response = await this.metodoExecutar({ url: 'api/categorias/show/' + this.$route.params.id, method: 'get' })
			if (response.status === 200 || response.status === 201) {
				this.categoria = response.data
				let log = {
					usuario_id: this.getUsuarioLogado.id,
					data_hora: new Date(),
					acao: 'Visualizando a Categoria de Pessoa '+this.categoria.nome,
					codigo: 2,
					alteracoes: {
						dominio: null,
						...response.data
					}
				}
				this.criarLog(log)
			} else{
				this.$q.notify({ message: 'Categoria não encontrada.', type: 'negative' })
				this.$router.push('/categorias')
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
