<template>
    <div class="container">
        <div class="text-center mt-2">
            <h1>Registro de Usuarios</h1>
        </div>
        <div class="card-body">
            <form @submit.prevent="crearUsuario({email:email, pass:pass1})">
                <b-row>
                    <input type="email" placeholder="Ingresa correo" class="form-control my-2" v-model="$v.email.$model" :class="{'is-invalid': $v.email.$error}">
                    <small class="text-danger d-block" v-if="!$v.email.email">Este mail es incorrecto</small>
                    <small class="text-danger d-block" v-if="!$v.email.required">Campo requerido</small>

                    <b-form-input type="password" placeholder="Ingresa contraseña" class="form-control my-2" v-model="$v.pass1.$model" :class="{'is-invalid': $v.pass1.$error}"></b-form-input>
                    <small class="text-danger d-block" v-if="!$v.pass1.minLength">Mínimo 6 caracteres</small>

                    <b-form-input type="password" placeholder="Repite contraseña" class="form-control my-2" v-model="$v.pass2.$model" :class="{'is-invalid': $v.pass2.$error}"></b-form-input>
                    <small class="text-danger d-block" v-if="!$v.pass2.sameAs">Contraseña incorrecta</small>

                    <b-button variant="primary" type="submit" class="btn btn-success" :disabled="!desactivar">Registrar</b-button>
                </b-row>
            </form>  
            <p class="text-danger d-block" v-if="error === 'auth/email-already-in-use'">Email ya está registrado</p>
        </div> 
    </div>    
</template>

<script>

import { mapActions,mapState } from "vuex";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    validations:{
        email:{required,email},
        pass1:{required, minLength: minLength(6)},
        pass2:{sameAs: sameAs('pass1')}
    },
    methods: {
        ...mapActions('usuario', ['crearUsuario'])
    },
    computed: {
        ...mapState('usuario', ['error']),
        desactivar(){
            return this.pass1 === this.pass2 && this.pass1 != ''
        },
        comprobar(){
            return this.pass1.length > 2 ? true : false
        }
    },
}
</script>