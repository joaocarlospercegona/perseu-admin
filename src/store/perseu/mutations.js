export function setDados(state, obj) {
	if (obj && obj.key) state[obj.key] = obj.value
}

export function limparStore(state) {
	state.login = {}
	state.usuario = {}
	state.permissoes = []
	state.menu = []
	state.financeiroCategoriaConta = null
}

export function limparPermissoes(state){
	state.permissoes = []
}
