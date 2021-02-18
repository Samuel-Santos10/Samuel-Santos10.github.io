Vue.component('component-matricula',{
    data:()=>{
        return {
            accion : 'nuevo',
            msg    : '',
            status : false,
            error  : false,
            buscar : "",
            matricula:{
                idMatricula : 0,
                codigo    : '',
                dui    : '',
                nit : '',
                promedio : '',
                paes : '',
                conducta : ''
            },
            matricula:[]
        }
    },
    methods:{
        buscandoMatricula(){
            this.matricula = this.matricula.filter((element,index,matricula) => element.dui.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.codigo.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 );
            if( this.buscar.length<=0){
                this.obtenerDatos();
            }
        },
        buscandoCodigoMatricula(store){
            let buscarCodigo = new Promise( (resolver,rechazar)=>{
                let index = store.index("codigo"),
                    data = index.get(this.matricula.codigo);
                data.onsuccess=evt=>{
                    resolver(data);
                };
                data.onerror=evt=>{
                    rechazar(data);
                };
            });
            return buscarCodigo;
        },
        async guardarMatricula(){
            /**
             * webSQL -> DB Relacional en el navegador
             * localStorage -> BD NOSQL clave/valor
             * indexedDB -> BD NOSQL clave/valor
             */
            let store = this.abrirStore("tblmatricula",'readwrite'),
                duplicado = false;
            if( this.accion=='nuevo' ){
                this.matricula.idMatricula = generarIdUnicoDesdeFecha();

                let data = await this.buscandoCodigoMatricula(store);
                duplicado = data.result!=undefined;
            }
            if( duplicado==false){
                let query = store.put(this.matricula);
                query.onsuccess=event=>{
                    this.obtenerDatos();
                    this.limpiar();

                    this.mostrarMsg('La matricula se guardo con exito',false);
                };
                query.onerror=event=>{
                    this.mostrarMsg('Error al guardar matricula',true);
                    console.log( event );
                };
            } else{
                this.mostrarMsg('Codigo de matricula duplicado',true);
            }
        },
        mostrarMsg(msg, error){
            this.status = true;
            this.msg = msg;
            this.error = error;
            this.quitarMsg(3);
        },
        quitarMsg(time){
            setTimeout(()=>{
                this.status=false;
                this.msg = '';
                this.error = false;
            }, time*1000);
        },
        obtenerDatos(){
            let store = this.abrirStore('tblmatricula','readonly'),
                data = store.getAll();
            data.onsuccess=resp=>{
                this.matricula = data.result;
            };
        },
        mostrarMatricula(matri){
            this.matricula = matri;
            this.accion='modificar';
        },
        limpiar(){
            this.accion='nuevo';
            this.matricula.idMatricula='';
            this.matricula.codigo='';
            this.matricula.dui='';
            this.matricula.nit='';
            this.matricula.promedio='';
            this.matricula.paes='';
            this.matricula.conducta='';
            this.obtenerDatos();
        },
        eliminarMatricula(matri){
            if( confirm(`Esta seguro que desea eliminar la matricula:  ${matri.dui}`) ){
                let store = this.abrirStore("tblmatricula",'readwrite'),
                    req = store.delete(matri.idMatricula);
                req.onsuccess=resp=>{
                    this.mostrarMsg('Matricula eliminada con exito',true);
                    this.obtenerDatos();
                };
                req.onerror=resp=>{
                    this.mostrarMsg('Error al eliminar matricula',true);
                    console.log( resp );
                };
            }
        },
        abrirStore(store,modo){
            let tx = db.transaction(store,modo);
            return tx.objectStore(store);
        }
    },
    created(){
        //this.obtenerDatos();
    },
    template:`
    <form v-on:submit.prevent="guardarMatricula" v-on:reset="limpiar">
        <div class="row">
            <div class="col-sm-5">
                <div class="row p-2">
                    <div class="col-sm text-center text-white bg-primary">
                        <div class="row">
                            <div class="col-11">
                                <h5>REGISTRO DE MATRICULA</h5>
                            </div>
                            <div class="col-1 align-middle" >
                                <button type="button" onclick="appVue.forms['cliente'].mostrar=false" class="btn-close" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">CODIGO:</div>
                    <div class="col-sm">
                        <input v-model="matricula.codigo" required pattern="^[A-Z]{4}[0-9]{6}$" type="text" class="form-control form-control-sm" >
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">DUI: </div>
                    <div class="col-sm">
                        <input v-model="matricula.dui" type="text" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">NIT: </div>
                    <div class="col-sm">
                        <input v-model="matricula.nit" type="text" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">PROMEDIO: </div>
                    <div class="col-sm">
                        <input v-model="matricula.promedio" type="text" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">PAES: </div>
                    <div class="col-sm">
                        <input v-model="matricula.paes" type="text" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">CONDUCTA: </div>
                    <div class="col-sm">
                        <input v-model="matricula.conducta" type="text" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm text-center">
                        <input type="submit" value="Guardar" class="btn btn-success">
                        <input type="reset" value="Limpiar" class="btn btn-warning">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm text-center">
                        <div v-if="status" class="alert" v-bind:class="[error ? 'alert-danger' : 'alert-success']">
                            {{ msg }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm"></div>
            <div class="col-sm-6 p-2">
                <div class="row text-center text-white bg-danger">
                    <div class="col"><h5>MATRICULAS REGISTRADAS</h5></div>
                </div>
                <div class="row">
                    <div class="col">
                        <table class="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <td colspan="5">
                                        <input v-model="buscar" v-on:keyup="buscandoMatricula" type="text" class="form-control form-contro-sm" placeholder="Buscar matricula">
                                    </td>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>DUI</th>
                                    <th>NIT</th>
                                    <th>PROMEDIO</th>
                                    <th>PAES</th>
                                    <th>CONDUCTA</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matri in matricula" v-on:click="mostrarMatricula(matri)">
                                    <td>{{ matri.codigo }}</td>
                                    <td>{{ matri.dui }}</td>
                                    <td>{{ matri.nit }}</td>
                                    <td>{{ matri.promedio }}</td>
                                    <td>{{ matri.paes }}</td>
                                    <td>{{ matri.conducta }}</td>
                                    <td>
                                        <a @click.stop="eliminarMatricula(matri)" class="btn btn-danger">DEL</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </form>
`
});