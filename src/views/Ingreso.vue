<template>
    <div class="container">
        <div class=" text-center mt-2">
            <h1>Ingreso de Usuario</h1>
        </div>
        <div class="card-body">
            <form @submit.prevent="ingresoUsuario({email:$v.email.$model, pass:$v.pass.$model})">
                <b-row>
                    <b-col>
                        <b-form-input type="email" placeholder="Ingresa correo" class="form-control my-2" v-model="$v.email.$model"></b-form-input>
                        <small class="text-danger d-block" v-if="!$v.email.required">Campo requerido</small>
                        <small class="text-danger d-block" v-if="!$v.email.email">Email no válido</small>

                        <b-form-input type="password" placeholder="Ingresa contraseña" class="form-control my-2" v-model="$v.pass.$model"></b-form-input>
                        <small class="text-danger d-block" v-if="!$v.pass.required">Campo requerido</small>
                        <small class="text-danger d-block" v-if="!$v.pass.minLength">Mínimo 6 carácteres</small>

                        <button type="submit" class="btn btn-success" :disabled="$v.$invalid">Ingresar</button>
                    </b-col>
                </b-row>
            </form>  
            <p class="text-danger d-block" v-if="error === 'auth/user-not-found'">Usuario incorrecto</p>
            <p class="text-danger d-block" v-if="error === 'auth/wrong-password'">Contraseña incorrecta</p>
        </div>
    </div>    
</template>

<script>

import { mapActions, mapState } from "vuex";
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
    name: 'Ingreso',
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    },
    computed: {
        ...mapState(['error'])
    },
    validations:{
        email:{required, email},
        pass:{required, minLength:minLength(6)}
    }
}
</script>