<template>
  <v-container>
    <v-layout>
      <v-flex xs6>
        <h1>Llaveros</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 md12>
        <v-btn color="success" class="btn btn-success btn-sm btn-block" flat @click="dialog = true">Agregar</v-btn>
      </v-flex>
    </v-layout>
       
    <form @submit.prevent="buscador(texto)">
      <input type="text" placeholder="Buscar..." class="form-control mt-5" v-model="texto" v-on:keyup="buscador(texto)">
    </form>
        
    <div v-if="carga" class="text-center mt-5">
      <h3>Cargando contenido...</h3>
      <pulse-loader :loading="carga"></pulse-loader>
    </div>

    <div class="card-body" v-if="!carga">
      <table class="table table-sm table-striped table-bordered table-responsive-lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Material</th>
            <th class="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          <!--<tr v-for="item in arrayFiltrado2" :key="item.id">-->
          <tr v-for="(item, index) in llaverosState" :key="index">
            <td>{{ item.number }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.material }}</td>
            <td class="text-center">
              <v-btn color="success" icon>
                <v-icon>visibility</v-icon>
              </v-btn> |
              <v-btn color="success" icon @click="dialogEditar = true">
                <v-icon>edit</v-icon>
              </v-btn> |
              <v-btn color="error" icon @click="dialogEliminar = true">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog agregar -->
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Agregar Llaveros</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form @submit.prevent="agregarLlaveros({number:number, name:name, material:material, country:country, notas:notas})">
                  <v-text-field v-model="number" label="Número *" type="number" required></v-text-field>
                  <v-text-field v-model="name" label="Nombre *" required ></v-text-field>
                  <v-text-field v-model="material" label="Material *" required></v-text-field>
                  <v-text-field v-model="country" label="País"></v-text-field>
                  <v-text-field v-model="notas" label="Comentarios"></v-text-field>
                </v-form>
              </v-container>
              <small>* Campos obligatorios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="error" @click="dialog = false">Cerrar</v-btn>
              <v-btn type="submit" color="success" @click="dialog = false">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>  
    <!-- Fin Dialog-->

    <!-- Dialog editar -->
      <v-row justify="center">
        <v-dialog v-model="dialogEditar" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Llaveros</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form @submit.prevent="editarLlaveros(llavero)">
                  <v-text-field v-model="number" label="Número *" type="number" required></v-text-field>
                  <v-text-field v-model="name" label="Nombre *" required ></v-text-field>
                  <v-text-field v-model="material" label="Material *" required></v-text-field>
                  <v-text-field v-model="country" label="País"></v-text-field>
                  <v-text-field v-model="notas" label="Comentarios"></v-text-field>
                </v-form>
              </v-container>
              <small>* Campos obligatorios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="error" @click="dialogEditar = false">Cerrar</v-btn>
              <v-btn type="submit" color="success" @click="dialogEditar = false">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    <!-- Fin Dialog editar-->

    <!-- Dialog ver -->

    <!-- Fin Dialog ver-->

    <!-- Dialog ver -->
      <v-row justify="center">
        <v-dialog v-model="dialogEliminar" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Eliminar Llavero</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                ¿Desea eliminar los datos del llavero?
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="error" @click="dialogEliminar = false">No</v-btn>
              <v-btn type="submit" color="success" @click="dialogEliminar = false" align-left>Sí</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>  
    <!-- Fin Dialog ver-->

  </v-container>
</template>

<script>
import { mapActions,mapState, mapGetters } from "vuex";
import { required, minLength } from 'vuelidate/lib/validators';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'Llaveros',
  data() {
    return {
      texto: '',
      number:'', 
      name:'', 
      material:'',
      country:'', 
      notas:'',
      dialog: false,
      dialogEliminar : false,
      dialogEditar : false
    }
  },
  methods:{
    ...mapActions('llaveros', ['buscador']),
    ...mapActions('llaveros', ['getLlaveros']),
    ...mapActions('llaveros', ['agregarLlaveros']),
    ...mapActions('llaveros', ['eliminarLlaveros'])
    
  },
  created() {
    this.getLlaveros()
  },
  computed:{
    ...mapState(['usuario'], ['carga']),
    //...mapState('usuario', ['usuario']),
    ...mapState('llaveros', ['llaverosState']),
    ...mapGetters('llaveros', ['arrayFiltrado2'])
  },
  components:{
    PulseLoader
  }  
}
</script>
