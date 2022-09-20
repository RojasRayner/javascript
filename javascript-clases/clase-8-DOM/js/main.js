/* INTERACTUAR CON EL HTML
CREAR ELEMENTOS HTML EN FUNCION DEL LISTADO DE NUESTROS OBJETOS IDENTIFICADOS EN LA CLASE 6
ESTABLECER UN MENSAJE DE BIENVENIDA ALEATORIO USUANDO UN ARRAY DE MENSAJES
CAPTURAR UNA O MAS ENTRADAS POR PROMPT() Y MOSTRARLAS EN EL HTML MODIFICANDO EL DOM
 */

//CONSIGNA
//INCORPORAR AL MENOS UN ARRAY EN TU PROYECTO
//UTILIZAR ALGUNOS METODOS O PROPIEDADES VISTO EN CLASES

const usuarios = [{ administrador: "admin", password: "admin" }];
let valor = 0;
let cantUsuarioEliminar = 1;
let cantidad = usuarios.length;
let main = document.querySelector("main");

let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");

main.appendChild(templateIndex);

let inputTextNomUsuario = templateIndex.querySelector(".nombreUsuario");
inputTextNomUsuario.setAttribute("required", true);

let inputTextPassUsuario = templateIndex.querySelector(".passUsuario");
inputTextPassUsuario.setAttribute("required", true);

let formularioUsuario = templateIndex.querySelector(".entrar");

let paginaAdministrador= document.querySelector("#paginaAdministrador");
let templateAdministrador = paginaAdministrador.content.querySelector(".wrapper");

let paginaEliminarUsuario = document.querySelector("#eliminarUsuario");
let templateEliminarUsuario = paginaEliminarUsuario.content.querySelector(".wrapper");

let paginaRegistroUsuario = document.querySelector("#paginaRegistro");
let templateRegistroUsuario = paginaRegistroUsuario.content.querySelector(".wrapper");

let paginaSalida = document.querySelector("#salida");
let templateSalida = paginaSalida.content.querySelector(".wrapper");
let agregar = templateAdministrador.querySelector(".agregar");

let eliminar = templateAdministrador.querySelector(".eliminar");
let salir = templateAdministrador.querySelector(".salir");

//recorre los objetos dentro del array si encuntra un objeto con nombre y password validos inicia como administrador de lo contrario retorna a inicio
function cliente() {
	const nombre = prompt("Ingrese su nombre: ");
	const pass = prompt("Ingrse su contraseña");
	for (const persona of usuarios) {
		if ((nombre == persona.administrador) && (pass == persona.password)) {

			inputTextNomUsuario.value = nombre;
			inputTextPassUsuario.value = pass;

			let headingDos = (templateIndex.querySelector("h2").textContent = `BIENVENIDO ADMINISTRADOR:\t\t${persona.administrador.toUpperCase()}`);
			let headingUno = (templateIndex.querySelector("h1").textContent = "ADMINISTRACION DE CENTRO ESTETICO");
			let headingTres = (templateIndex.querySelector("h3").style.color = "red");
            
            formularioUsuario.addEventListener("click", () =>{
                templateIndex.remove();
                paginaIndex.remove();
                
                main.appendChild(templateAdministrador);
                administradores(nombre,usuarios);
            });

		} else {

            let headingDos = (templateIndex.querySelector("h2").textContent = `AREA RESTRINGIDA USUARIO:\t${nombre.toUpperCase()}\tINVALIDO`);
			headingDos = templateIndex.querySelector("h2").style.color = "red";
			let headingUno = (templateIndex.querySelector("h1").textContent = "ADMINISTRACION DE CENTRO ESTETICO");
			let headingTres = (templateIndex.querySelector("h3").textContent = "AREA RESTRINGIDA");

            inputTextNomUsuario.remove();
            inputTextPassUsuario.remove();

		}
	}
}
//menu de administrador
function administradores(nombre,usuarios) {

    let headingDos = (templateAdministrador.querySelector("h2").textContent = `${nombre.toUpperCase()}`);
	headingDos = templateAdministrador.querySelector("h2").style.color = "red";

	let headingUno = (templateAdministrador.querySelector("h1").textContent = "CENTRO ESTETICO");

	let headingTres = (templateAdministrador.querySelector("h3").textContent = "AREA RESTRINGIDA ");

    let menuAdministrador = templateAdministrador.querySelector("ul");
    let listaUno = document.createElement("li");
    listaUno.innerHTML = "<li>ELIGA UNA DE LAS OPCIONES</li>";
    menuAdministrador.appendChild(listaUno);
    
    let botonera = templateAdministrador.querySelector(".botonera");
    botonera.classList.add("d-flex");
    botonera.classList.add("flex-column");
    botonera.classList.add("flex-nowrap");
    botonera.classList.add("justify-content-center");
    botonera.classList.add("align-items-center");


    agregar.addEventListener("click", () =>{
        templateAdministrador.remove();
        paginaAdministrador.remove();
                
        main.appendChild(templateRegistroUsuario);
        nuevoAdministrador(usuarios);
    });

    eliminar.addEventListener("click", () =>{
        templateAdministrador.remove();
        paginaAdministrador.remove();
                
        main.appendChild(templateEliminarUsuario);
        eliminarAdministrador(usuarios,nombre)
    });


    salir.addEventListener("click", () =>{
        templateAdministrador.remove();
        paginaAdministrador.remove();
                
        main.appendChild(templateSalida);
		salida();
    });
}
//Eliminar Administrador
function eliminarAdministrador(usuarios,nombre){
    usuarios.forEach(element => {
        let templateEliminarUsuarioClonada = templateEliminarUsuario.cloneNode(true);
        main.appendChild(templateEliminarUsuarioClonada);

        let inputEliminarNomUsuario = templateEliminarUsuario.querySelector(".nombreUsuario");
        let inputEliminarPassUsuario = templateEliminarUsuario.querySelector(".passUsuario");
        
        nombre = element.administrador;

        inputEliminarNomUsuario.value = nombre;
		inputEliminarPassUsuario.value = element.password;
        
        let eliminarUsuario = templateEliminarUsuario.querySelector(".eliminarUsuario");
        let index = usuarios.indexOf(element);
        eliminarUsuario.addEventListener("click", () =>{
            usuarios.splice(index,1);
            alert("SE ELIMINO USUARIO");
            alert(`QUEDAN ${usuarios.length} USUARIOS`);

            templateEliminarUsuario.remove();
            paginaEliminarUsuario.remove();

            main.appendChild(templateAdministrador);
            administradores(nombre,usuarios);

        });

        let siguienteUsuario = templateEliminarUsuario.querySelector(".salir");
        siguienteUsuario.addEventListener("click", () =>{
            templateEliminarUsuario.remove();
            paginaEliminarUsuario.remove();
                
            main.appendChild(templateAdministrador);
            administradores(nombre,usuarios);
        });
        
    });
}
//agrega nuevo ADMINISTRADOR
function nuevoAdministrador(usuarios){

    nuevoAdmin = prompt("caracter no permitido: @\nIngrese NUEVO ADMINISTRADOR: ");
    nuevaPass = prompt("Ingrese NUEVA CONTRASEÑA");

    let inputRegistroNomUsuario = templateRegistroUsuario.querySelector(".nombreUsuario");
    let inputRegistroPassUsuario = templateRegistroUsuario.querySelector(".passUsuario");

    inputRegistroNomUsuario.value = nuevoAdmin;
	inputRegistroPassUsuario.value = nuevaPass;
    
    
    let entrarRegistrar = templateRegistroUsuario.querySelector(".entrarRegistrar");
    entrarRegistrar.addEventListener("click", () =>{

        usuarios.push({ administrador: nuevoAdmin, password: nuevaPass});

        alert("SE GUARDO NUEVO ADMINISTRADOR"+ `TIENES ${usuarios.length} ADMINISTRADORES`);
        templateRegistroUsuario.remove();
        paginaRegistroUsuario.remove();
        
        main.appendChild(templateAdministrador);
        administradores(nombre,usuarios);
    });

    let siguienteUsuario = templateRegistroUsuario.querySelector(".salir");
    siguienteUsuario.addEventListener("click", () =>{

        templateRegistroUsuario.remove();
        paginaRegistroUsuario.remove();
        
        main.appendChild(templateAdministrador);
        administradores(nombre,usuarios);

    });
}
//FUNCION SALIDA
function salida(){
    let headingDos = (templateSalida.querySelector("h2").textContent = "SALIDA DEL SIMULADOR");
	let headingUno = (templateSalida.querySelector("h1").textContent = "ADMINISTRACION DE CENTRO ESTETICO");
	let headingTres = (templateSalida.querySelector("h3").style.color = "red");
    headingTres = (templateSalida.querySelector("h3").textContent = "ESPERAMOS SU PRONTO REGRESO");
    let removerBoton = templateSalida.querySelector("button");
    removerBoton.remove();
}
//funcion de inicio para comenzar debe aceptar y si le da cancelar se sale del programa
bienvenida();
function bienvenida() {
	const inicio = confirm(
		"Bienvenido al Programa de Administración de Usuarios\nDesea Continuar"
	);
	if (inicio == true) {
		cliente();
	} else {
        templateIndex.remove();
        paginaIndex.remove();
        main.appendChild(templateSalida);
		salida();
	}
}
