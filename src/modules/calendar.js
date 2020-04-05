export default {
    namespaced: true,
    state: {
        loading:{
            titulo: '',
            estado: false,
            color: 'primary'
        }
    },
    mutations: {
        mostrarLoading(state, payload){
            state.loading.titulo = payload.titulo
            state.loading.color = payload.color
            state.loading.estado = true
        },
        ocultarLoading(state){
            state.loading.estado = false
        }
      
    },
    actions: {
    },
    getters: {
    }
}