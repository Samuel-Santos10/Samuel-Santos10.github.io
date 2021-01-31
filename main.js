
var miDBAlumnos= openDatabase('dbAlumnos','1.0','Aplicacion de Alumnos',5*1024*1024);
window.id = 0;
if(!miDBAlumnos){
    alert("Elnavegador no soporta Web SQL");
}

var appVue = new Vue({

    el: '#appAlumnos',
    data: {
        alumno:{
            idAlumno  : 0,
            codigo      : '',
            nombre       :'',
            direccion         : '', 
            municipio         : '', 
            departamento      : '',    
            telefono          : '',
            fechanacimiento   : '',      
            sexo              : '' 
        },
        alumnos:[]
    },
    methods:{
        guardarAlumno(){
            /**
             * BD Web SQL
             */
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('INSERT INTO alumnos(idAlumno,codigo,nombre,direccion,municipio,departamento,telefono,fechanacimiento,sexo) VALUES(?,?,?,?,?,?,?,?,?) ',
                    [++id,this.alumno.codigo,this.alumno.nombre,this.alumno.direccion, this.alumno.municipio,this.alumno.departamento,this.alumno.telefono, this.alumno.fechanacimiento,this.alumno.sexo]);
                this.obtenerAlumnos();
                this.limpiar();
            }, err=>{
                console.log( err );
            });
        },
  
         updte() {  
            
            var id = document.getElementById("idAlumno").value;  
            var cod = document.getElementById("codigo").value;  
            var nombr = document.getElementById("nombre").value;  
            var direcc = document.getElementById("direccion").value;  
            var municip = document.getElementById("municipio").value;  
            var depar = document.getElementById("departamento").value;  
            var tele = document.getElementById("telefono").value;  
            var fecha = document.getElementById("fechanacimiento").value;  
            var sex = document.getElementById("sexo").value; 

            dbObj.transaction(function (tx) {  
                tx.executeSql('update alumnos set codigo="' + cod + '",nombre="' + nombr + '",direccion=' + direcc + '",municipio=' + municip + '",departamento=' + depar + '",telefono=' + tele + '",fechanacimiento=' + fecha + '",sexo=' + sex + ' where idAlumno=' + id + '');  
            });  
  
            this.obtenerAlumnos();  
        },  

        obtenerAlumnos(){
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('SELECT * FROM alumnos',[],(index,data)=>{
                    this.alumnos = data.rows;
                    id=data.rows.length;
                });
            }, err=>{
                console.log( err );
            });
        },
        
        mostrarAlumno(aln){
            this.alumno = aln;
        },

        limpiar(){
            this.alumno.codigo='';
            this.alumno.nombre='';
            this.alumno.direccion='';
            this.alumno.municipio='';
            this.alumno.departamento='';
            this.alumno.telefono='';
            this.alumno.fechanacimiento='';
            this.alumno.sexo='';

        }
    },
    created(){
        miDBAlumnos.transaction(tran=>{
            tran.executeSql('CREATE TABLE IF NOT EXISTS alumnos(idAlumno int PRIMARY KEY NOT NULL, codigo varchar(10), nombre varchar(60),direccion varchar(60),municipio varchar(50),departamento varchar(50),telefono varchar(10),fechanacimiento date(), sexo varchar(20))');
        }, err=>{
            console.log( err );
        });
        this.obtenerAlumnos();
    }
});