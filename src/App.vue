<template>
  
    <v-card class="overflow-hidden">
      <v-app>
        <v-app-bar app absolute dark color="dark" elevate-on-scroll scroll-target="#scrolling-techniques-7" >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="headline text-uppercase">
            <span>SGC - </span>
            <span class="font-weight-light">Gestor de Colecciones</span>
          </v-toolbar-title>

          <v-toolbar-items>
            <v-btn :to="{name: 'llaveros'}" v-if="existeUsuario" exact class="mx-3">Llaveros</v-btn>
          </v-toolbar-items>
          
          <v-spacer></v-spacer>

          <v-btn :to="{name: 'inicio'}" v-if="existeUsuario" exact>
            <span class="mx-2">Inicio</span>
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn :to="{name: 'registro'}" v-if="!existeUsuario">
            <span class="mx-2">Registro</span>
          </v-btn>
          <v-btn :to="{name: 'ingreso'}" v-if="!existeUsuario" class="mx-2">
            <span class="mx-2">Ingresar</span>
          </v-btn>
          <v-btn @click="cerrarSesion" v-if="existeUsuario" class="mx-2">
            <span class="mr-2">Cerrar Sesión</span>
            <v-icon>open_in_new</v-icon>
          </v-btn>
        </v-app-bar>
        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="600">
          <v-container style="height: 1500px;">
            <v-content>
              <router-view></router-view>
            </v-content>
          </v-container>
        </v-sheet>
      </v-app>
    </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'App',
  data: () => ({
    drawer : true
  }),
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed: {
    ...mapGetters(['existeUsuario'])
  },
};
</script>
