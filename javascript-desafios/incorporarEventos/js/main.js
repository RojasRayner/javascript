//INCORPORAR EVENTOS


//VARIABLES GLOBALES
const administradores = [{superUsuario:"admin",password:"admin"}];
const usuarios = [];
const clientes = [];
const servicios = [{titulo:"Limieza Facial",des:"",precio:300,horaTrata:1},{titulo:"Maniqura",des:"",precio:600,horaTrata:2},{titulo:"Pediqura",des:"",precio:600,horaTrata:2}];
const productos =[{titulo:"AGUA MICELAR",id: 1,precio:300,tipoDePiel:"NORMAL",cant:10},{titulo:"JABON FACIAL",id: 2,precio:120,tipoDePiel:"NORMAL",cant:10},{titulo:"ESPUMA DESMAQUILLANTE",id: 3,precio:450,tipoDePiel:"MIXTA",cant:10},{titulo:"TONICO HIDRATANTE",id: 4,precio:210,tipoDePiel:"SECA",cant:10},{titulo:"TONICO REVITALIZANTE",id: 5,precio:210,tipoDePiel:"GRASA",cant:10}];
const horaDeTrabajo = [];
function FechaServicios(fecha,hora,servicioUsuario,horaTrata,nombreUsuario,telUsuario,passUsuario){
    this.cliente = nombreUsuario;
    this.telefono = telUsuario;
    this.fecha = fecha;
    this.hora = hora;
    this.serviCliente = servicioUsuario;
    this.horaTrata = horaTrata;
    this.password = passUsuario
}
const carritoCompra = [];
let nombreUsuario;
let passUsuario;

//CAPTURAMOS LOS ELEMENTOS DE LA PAGINA DE INICIO
//COMIENZO DEL SIMULADOR

let main = document.querySelector("main");

let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");
main.appendChild(templateIndex);

let inputTextNomUsuario = templateIndex.querySelector(".nombreUsuario");
inputTextNomUsuario.setAttribute("required",true);

inputTextNomUsuario.addEventListener("input", (e)=>{
    nombreUsuario = e.target.value;
    usuarios.push(nombreUsuario);
    return usuarios;
});

let inputTextPassUsuario = templateIndex.querySelector(".passUsuario");
inputTextPassUsuario.setAttribute("required",true);

inputTextPassUsuario.addEventListener("input", (e)=>{
    passUsuario = e.target.value;
    usuarios.push(passUsuario);
    return usuarios;
});

let formularioUsuario = templateIndex.querySelector(".entrada");
formularioUsuario.addEventListener("submit", loguin);

console.log(usuarios);
//FUNCION DE BUSQUEDA DE USUARIO
function loguin(usuarios) {
    console.log(usuarios)
    for (const administrado of administradores) {
        if((usuarios[0] == administrado.superUsuario) && (usuarios[1] == administrado.password)){
            templateIndex.remove();
            let templateAdministrador = document.createElement("div");
            templateAdministrador.innerHTML = `
            <div class="wrapper">
                <div class="inner">
                    <form action="">
                        <div class="d-flex justify-content-center align-items-center form-wrapper flex-column">
                            <h2>MENU DE ADMINISTRADOR</h2>
                            <h1 class="usuario">USUARIO: ${usuarios[0]}</h1>
                            <h3 class="infoMenu">INFORMACION PARA EL MENU</h3>
                        </div>
                        <div class="botonera">
                            <a href="#" class="btn btn-primary productos mb-2 btn-lg">PRODUCTOS</a>
                            <a href="#" class="btn btn-primary servicios mb-2 btn-lg">SERVICIOS</a>
                            <a href="#" class="btn btn-primary administradores mb-2 btn-lg">ADMINISTRADORES</a>
                            <a href="#" class="btn btn-primary salir mb-2 btn-lg">SALIR</a>
                        </div>
                    </form>
                </div>
            </div>`;
            main.appendChild(templateAdministrador);
            let botonera = templateAdministrador.querySelector(".botonera");
            let botonProductos = botonera.querySelector(".productos");
            let botonServicios = botonera.querySelector(".servicios");
            let botonAdministradores = botonera.querySelector(".administradores");
            let botonSalir = botonera.querySelector(".salir");

            botonProductos.addEventListener("click",()=>{
                manejarProductos();
            });

            botonServicios.addEventListener("click",()=>{
                manejarServicios();
            });

            botonAdministradores.addEventListener("click",()=>{
                manejarAdministradores();
            });

            botonSalir.addEventListener("click",()=>{
                Salir();
            });

        }else if(clientes.length == 0) {
            templateIndex.remove();
            agregarCliente(usuarios);
        }
    }
}
//FUNCION PARA AGREGAR CLIENTES
function agregarCliente(usuarios){

            let templateRegistroCliente = document.createElement("div");
            templateRegistroCliente.innerHTML = `
            <div class="wrapper">
                <div class="inner">
                    <form action="" class="registroNuevoUsuario">
                        <h3>FORMULARIO DE REGISTRO NUEVO CLIENTE</h3>
                        <div class="form-group">
                            <div class="form-wrapper">
                                <label for="nombreUsuario">Nombre de Usuario</label>
                                <input type="text" class="form-control nombreUsuario" required placeholder="Ingrese nombre de Usuario" value=${usuarios[0]}>
                            </div>
                        </div>
                        <div class="form-wrapper">
                            <label for="passUsuarioDos">Password</label>
                            <input type="password" class="form-control passUsuarioDos password" required placeholder="Ingrese Password" aria-label="password">
                            <label for="passUsuarioTres">Password</label>
                            <input type="password" class="form-control passUsuarioTres password" required placeholder="Ingrese Password" aria-label="password">
                        </div>
                        <button class="btn btn-primary entrarRegistrar mb-2 btn-lg" type="submit">Registrar</button>
                        <button type="submit" class="btn btn-primary salir mb-2 btn-lg">SALIR</button>
                    </form>
                </div>
            </div>`;
            main.appendChild(templateRegistroCliente);
}