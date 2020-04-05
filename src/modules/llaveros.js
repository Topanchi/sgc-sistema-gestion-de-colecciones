var firebase = require("firebase/app");
import router from '../router'
import db from '../main'
export default {
  namespaced: true,
  state: {
    llaverosState: [],
    llavero: {id:'', number:'', name:'',titulo:'',material:'',country:'',notas:''},
    carga: false,
    texto: ''
  },
  mutations: {
    setLlaveros(state, llaverosState){
      state.llaverosState = llaverosState
    },
    setLlavero(state, llavero){
      state.llavero = llavero
    },
    eliminarLlaveros(state, id){
      state.llaverosState = state.llaverosState.filter( doc => {
        return doc.id != id
      })
    },
    cargarFirebase(state, payload){
      state.carga = payload
    }
  },
  actions: {
    buscador({commit, state}, payload){
      console.log(payload);
      state.texto = payload.toLowerCase();
    },
    getLlaveros({commit}){
      commit('cargarFirebase', true);
      const llaveros = []
      db.collection('llaveros').orderBy("number", "asc").get()
      .then(snapshot => {
        snapshot.forEach( doc => {
          let llavero = doc.data();
          llavero.id = doc.id
          llaveros.push(llavero)
        })
        setTimeout(()=>{
          commit('cargarFirebase', false);
        }, 2000);
      })
      commit('setLlaveros', llaveros)
      console.log(llaveros)
    },
    getLllavero({commit}, id){
      db.collection('llaveros').doc(id).get()
      .then(doc =>{
          let llavero = doc.data();
          llavero.id = doc.id
          commit('setLlavero', llavero)
      }).catch(err => {
        console.log('Error getting document', err);
      });
    },
    agregarLlaveros({commit}, {id,number,name,material,country,notas}){
      commit('cargarFirebase', true);
      const usuario = firebase.auth().currentUser
      db.collection('llaveros').add({
        id: id,
        number: number,
        name: name,
        material: material,
        country: country,
        notas: notas
      })
      .then(doc =>{
        console.log("Llavero AGREGADO Id: ", doc.id);
        router.push({name: 'llaveros'})
        commit('cargarFirebase', false);
      })
    },
    editarLlaveros({commit}, llavero){
      db.collection('llaveros').doc(llavero.id).update({
        id: llavero.id,
        number: llavero.number,
        name: llavero.name,
        material: llavero.material,
        country: llavero.country,
        notas: llavero.notas
      })
      .then(()=>{
        router.push({name: 'llaveros'})
      })
    },
    eliminarLlaveros({commit, dispatch}, id){
      db.collection('llaveros').doc(id).delete()
      .then(()=>{
        commit('eliminarLlaveros', id)
      })
    }
  },
  getters: {
    arrayFiltrado2(state){
      let arregloFiltrado2 = []
      for(let llavero of state.llaveros){
        let name = llavero.name.toLowerCase();
        let material = llavero.material.toLowerCase();
        if(name.indexOf(state.texto) >= 0 || material.indexOf(state.texto) >= 0){
          arregloFiltrado2.push(llavero);
        }
      }
      return arregloFiltrado2;
    }
  }
}