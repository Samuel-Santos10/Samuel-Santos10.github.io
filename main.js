var generarIdUnicoDesdeFecha=()=>{
    let fecha = new Date();//03/02/2021
    return Math.floor(fecha.getTime()/1000).toString(16);
}, db;
var appVue = new Vue({
    el:'#appSistema',
    data:{
        forms:{
            'registro_alumnos':{mostrar:false},
            'matricula':{mostrar:false},
            'inscripcion':{mostrar:false},
        }
    },
    methods:{
        abrirBd(){
            let indexDb = indexedDB.open('db_sistema_academico',1);
            indexDb.onupgradeneeded=event=>{
                let req=event.target.result,

                    tblmatricula = req.createObjectStore('tblmatricula',{keyPath:'idMatricula'}),
                    tblregistro = req.createObjectStore('tblregistro',{keyPath:'idRegistro'}),
                    tblinscripcion = req.createObjectStore('tblinscripcion',{keyPath:'idInscripcion'})

                tblmatricula.createIndex('idMatricula','idMatricula',{unique:true});
                tblmatricula.createIndex('codigo','codigo',{unique:false});
                
                tblregistro.createIndex('idRegistro','idRegistro',{unique:true});
                tblregistro.createIndex('codigo','codigo',{unique:false});

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

document.addEventListener("DOMContentLoaded",event=>{
    let el = document.querySelectorAll(".mostrar").forEach( (element, index)=>{
        element.addEventListener("click",evt=>{
            appVue.forms[evt.target.dataset.form].mostrar = true;
            appVue.$refs[evt.target.dataset.form].obtenerDatos();
        });
    } );
});