/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default ;
window.db = '';
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('registro_alumnos-component', require('./components/registro_alumnos.vue').default);
Vue.component('inscripcion-component', require('./components/inscripcion.vue').default);
Vue.component('matricula-component', require('./components/matricula.vue').default);
Vue.component('materias-component', require('./components/materias.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 const app = new Vue({
    el: '#app',
    methods:{
        abrirBd(){
            let indexDb = indexedDB.open('db_sistema_academico',1);
            indexDb.onupgradeneeded=event=>{
                let req=event.target.result,

                    tblmatricula = req.createObjectStore('tblmatricula',{keyPath:'idMatricula'}),
                    tblregistro = req.createObjectStore('tblregistro',{keyPath:'idRegistro'}),
                    tblmateria = req.createObjectStore('tblmateria',{keyPath:'idMateria'}),
                    tblinscripcion = req.createObjectStore('tblinscripcion',{keyPath:'idInscripcion'})

                tblmatricula.createIndex('idMatricula','idMatricula',{unique:true});
                tblmatricula.createIndex('codigo','codigo',{unique:false});
                tblmatricula.createIndex('id','id',{unique:false});
                
                tblregistro.createIndex('idRegistro','idRegistro',{unique:true});
                tblregistro.createIndex('codigo','codigo',{unique:false});

                tblmateria.createIndex('idMateria','idMateria',{unique:true});
                tblmateria.createIndex('codigo','codigo',{unique:false});

                tblinscripcion.createIndex('idInscripcion','idInscripcion',{unique:true});
                tblinscripcion.createIndex('codigo','codigo',{unique:false});

     
            };
            indexDb.onsuccess = evt=>{
                db=evt.target.result;
            };
            indexDb.onerror=e=>{
                console.log("Error al conectar a la BD", e);
            };
        }
    },
    created(){
        this.abrirBd();
    }
});

