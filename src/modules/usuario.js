var firebase = require("firebase/app");
import router from '../router'
import db from '../main'
export default {
    namespaced: true,
    state: {
        usuario: '',
        carga: false,
        texto: ''
    },
    mutations: {
        setUsuario(state,payload){
            state.usuario = payload
        },
        setError(state, payload){
            state.error = payload
        },
        //Carga firebase
        cargarFirebase(state, payload){
            state.carga = payload
        }
      
    },
    actions: {
        crearUsuario({commit}, payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.pass)
              .then(res=>{
                commit('setUsuario',{email:res.user.email, uid: res.user.uid})
              })
              .catch(err=>{
                console.log(err.message);
                commit('setError', err.code)
              })
        },
        ingresoUsuario({commit}, payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
                .then(res=>{
                    commit('setUsuario',{email:res.user.email, uid: res.user.uid})
                    router.push({name: 'inicio'})
                })
                .catch(err=>{
                    
                })
        },
        detectarUsuario({commit}, payload){
            if(payload != null){
                commit('setUsuario',{email:payload.email, uid:payload.uid})
            }else{
                commit('setUsuario',null)
            }
        },
        cerrarSesion({commit}){
            firebase.auth().signOut()
            commit('setUsuario', null)
            router.push({name: 'ingreso'})
        },

    },
    getters: {
        existeUsuario(state){
            if(state.usuario === null || state.usuario === '' || state.usuario === undefined){
              return false
            }else{
              return true
            }
          }
    }
}

