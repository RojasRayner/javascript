//INTERACTUAR CON EL HTML
//PANTALLA DE BIENVENIDA


const administradores = [{superUsuario:"admin",password:"admin"}];
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

let main = document.querySelector("main");

let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");

main.appendChild(templateIndex);

let formularioUsuario = templateIndex.querySelector(".entrada");
let inputTextNomUsuario = templateIndex.querySelector(".nombreUsuario");
inputTextNomUsuario.setAttribute("required",true);

let nombreUsuario;
inputTextNomUsuario.addEventListener("input", (e)=>{
    nombreUsuario = e.target.value;
    console.log(nombreUsuario + "primero");
    return nombreUsuario;
});

console.log(`${nombreUsuario}` + "segundo");

let inputTextPassUsuario = templateIndex.querySelector(".passUsuario");
inputTextPassUsuario.setAttribute("required",true);
let passUsuario;
inputTextPassUsuario.addEventListener("input", (e)=>{
    passUsuario = inputTextPassUsuario.value;
    return passUsuario;
});

let paginaRegistro = document.querySelector("#paginaRegistro");
let templateRegistro = paginaRegistro.content.querySelector(".wrapper");

let formularioNuevoUsuario = templateRegistro.querySelector(".registroNuevoUsuario");
let inputTextRegistroNomUsuario = templateRegistro.querySelector(".nombreUsuario");
inputTextRegistroNomUsuario.value = `${nombreUsuario}`;
console.log(nombreUsuario + "tercero");

let inputTextRegistroTelUsuario = templateRegistro.querySelector(".telUsuario");
inputTextRegistroTelUsuario.setAttribute("placeholder","092 000 000");
let telUsuario;
inputTextRegistroTelUsuario.addEventListener("input", (e)=>{
    telUsuario = inputTextRegistroTelUsuario.value;
    return telUsuario;
});

let inputTextRegistroPassUsuario = templateRegistro.querySelector(".passUsuario");
let passUsuarioDos;
inputTextRegistroPassUsuario.addEventListener("input",(e)=>{
    passUsuarioDos = inputTextRegistroPassUsuario.value;
    return passUsuarioDos;
});

let inputTextRegistroPassUsuarioDos = templateRegistro.querySelector(".passUsuarioDos");
let passUsuarioTres;
inputTextRegistroPassUsuarioDos.addEventListener("input",(e)=>{
    passUsuarioTres = inputTextRegistroPassUsuarioDos.value;
    return passUsuarioTres;
});

let aEntrar = document.querySelector(".entrar");
aEntrar.addEventListener("click",()=>{
    //eliminamos PRIMER formulario
    templateIndex.remove();
    paginaIndex.remove();
    //HAbilitamos el SEGUNDO FORMULARIO
    main.appendChild(templateRegistro);
});


formularioUsuario.addEventListener("submit", loguin);

//loguin(nombreUsuario,passUsuario,passUsuarioDos, passUsuarioTres); 
//FUNCION DE BUSQUEDA DE USUARIO
function loguin() {
    for (const administrado of administradores) {
        if((nombreUsuario == administrado.superUsuario) && (passUsuario == administrado.password)){
            let headingDos = (templateIndex.querySelector("h2").textContent = `BIENVENIDO\t\t${administrado.superUsuario.toUpperCase()}`);
            let headingUno = (templateIndex.querySelector("h1").textContent = "ADMINISTRACION DE CENTRO ESTETICO");
            let headingTres = (templateIndex.querySelector("h3").style.color = "#c2c0b6f8");
            administrador(nombreUsuario,passUsuario);
        }else{
            if((clientes.length === 0) && (passUsuarioDos == passUsuarioTres)){
                //capturamos el evento submit del formulario
                
                formularioUsuario.addEventListener("submit", nuevoCliente);
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            } else if(passUsuarioDos !== passUsuarioTres){
                let headingTresRegistro = (templateRegistro.querySelector("h3").textContent = "FORMULARIO DE REGISTRO\nPASSWORD NO COINCIDEN");

            }else{
                for (const cliente of clientes) {
                    if((nombreUsuario == cliente.nombre) && (passUsuario == cliente.pass) && (telUsuario == cliente.tel)){
                        menuCliente(nombreUsuario,passUsuario,telUsuario);
                    }else {
                        nuevoCliente(nombreUsuario,passUsuario,telUsuario);
                        }
                    }
                }
            }
        }
    }
//FUNCION PARA VER LA PASSWORD INGRESADA AL DARLE CLICK EN EL INPUT
inputTextRegistroPassUsuario.onClick = mostrarContrasena;
inputTextRegistroPassUsuarioDos.onClick = mostrarContrasena;
function mostrarContrasena(){
    let tipo = document.querySelectorAll(".password");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}




