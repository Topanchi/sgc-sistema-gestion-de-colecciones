<template>
  <v-container grid-list-md>
    <v-layout align center>
      <h1>Bienvenido</h1>
    </v-layout>
    <v-layout :wrap="true">
      <v-flex xs4>
        <v-card color="dark" dark>
          <v-date-picker v-model="fecha"
            full-width
            locale="es-cl"
            :min="minimo"
            :max="maximo"
            @change="getDolar(fecha)"
            >
          </v-date-picker>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card full-width>
          <v-card-title>
            Dólar hoy
          </v-card-title>
          <v-card-text>
            <v-card-text class="display-1 text-xs-center">
              {{valor}}
            </v-card-text>
            <p>Valor del dólar al día de hoy</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            UF hoy
          </v-card-title>
          <v-card-text>
            <v-card-text @change="getUf()" class="display-1 text-xs-center">
              {{valorUf}}
            </v-card-text>
            <p>Valor dela UF al día de hoy</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!--
    <v-layout  row wrap>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Dólar hoy
          </v-card-title>
          <v-card-text>
            <v-card-text class="display-1 text-xs-center">
              {{valor}}
            </v-card-text>
            <p>Valor del dólar al día de hoy</p>
          </v-card-text>
        </v-card>
      </v-flex>

     <v-flex xs4>
       <v-card>
         <v-card-title>
           UF hoy
         </v-card-title>
         <v-card-text>
           <v-card-text class="display-1 text-xs-center">
            {{valorUf}}
          </v-card-text>
           <p>Valor dela UF al día de hoy</p>
         </v-card-text>
       </v-card>
     </v-flex>
    </v-layout>
    -->
  </v-container>
</template>

<script>

import axios from "axios";
import { mapMutations, mapActions,mapState, mapGetters } from "vuex";
  export default {
    name: 'Inicio',
    data(){
      return{
        fecha: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        minimo: '2000',
        maximo: new Date().toISOString().substr(0, 10),
        valor: null,
        valorUf: null
      }
    },
    methods:{
      ...mapMutations('calendar', ['mostrarLoading']),
      ...mapMutations('calendar', ['ocultarLoading']),

      async getDolar(dia){
        let arrayFecha = dia.split(['-'])
        let ddmmyy = arrayFecha[2]+'-'+arrayFecha[1]+'-'+arrayFecha[0];

        try {
          this.mostrarLoading({titulo:'Accediendo a información', color:'secondary'})
          let datos = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`)

          if((datos.data.serie.length > 0)) {
            this.valor = await datos.data.serie[0].valor
          }else{
            this.valor = 'Sin resultados'
          }
        } catch (error) {
          // console.log(error);
        }
        finally{
          this.ocultarLoading()
        }
      },
      /**/
      async getUf(){
        //let dia = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        let dia = new Date().toISOString().substr(0, 10)
        let arrayFecha2 = dia.split(['-'])
        let date = arrayFecha2[2]+'-'+arrayFecha2[1]+'-'+arrayFecha2[0];

        try{
          this.mostrarLoading({titulo:'Accediendo a información', color:'secondary'})
          let datosUf = await axios.get(`https://mindicador.cl/api/uf/${date}`)
          if(datosUf.data.serie.length > 0) {
            this.valorUf = await datosUf.data.serie[0].valorUf
          }else{
            this.valorUf = 'Sin resultados'
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.ocultarLoading()
        } 
      }
    },
    created(){
      this.getDolar(this.fecha),
      this.getUf()
    },
    computed: {
      ...mapState(['usuario', 'carga'])
      //...mapState('usuario', ['usuario']),
      //...mapState('usuario', ['carga'])
    }
  }
</script>