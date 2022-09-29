//ARRAY DE SERVICIOS Y SUBIDA AL LOCALSTORAGE
const servicios = [{titulo:"Limieza Facial",des:"Procedimiento que elimina todas las impurezas que se encuentran en la piel generadas por el mismo cuerpo y por el ambiente.",precio:300,horaTrata:1,img:"../images/productos/limpiezaFacial.png",id:1},{titulo:"Maniqura",des:" Tratamiento de belleza cosmético para las uñas y manos",precio:600,horaTrata:2,img:"../images/productos/maniqura.png",id:2},{titulo:"Pediqura",des:"Tratamiento de belleza cosmético para las uñas y pies.",precio:600,horaTrata:2,img:"../images/productos/pediqura.png",id:3}];
let serviciosJson = JSON.stringify(servicios);
localStorage.setItem("servicios", serviciosJson);
//VARIABLES DE GUARDADOS DE DATOS
const horaDeTrabajo = [];
const agendaServicios = [];
//COMIENZO DEL SCRIPT QUE PERMITE A LOS CLIENTES AGENDAR SERVICIOS
let main = document.querySelector("main");
//CAPTURA DEL TEMPLATE INDEX DEL SIMULADOR Y SU CONTENIDO
let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");
main.appendChild(templateIndex);
let formularioUsuario = templateIndex.querySelector(".entrada");
formularioUsuario.addEventListener("submit", cliente);
//CAPTURA DEL TEMPLATE DEL MENU DE USUARIO Y SUS BOTONES
let paginaAdministrador = document.querySelector("#paginaAdministrador");
let templateAdministrador = paginaAdministrador.content.querySelector(".wrapper");
let agregar = templateAdministrador.querySelector(".agregar");
let eliminar = templateAdministrador.querySelector(".eliminar");
let salir = templateAdministrador.querySelector(".salir");
//CAPTURA DEL TEMPLATE DE REGISTRO NUEVO USUARIO Y SU CONTENIDO
let paginaRegistroAdministrador = document.querySelector("#paginaRegistro");
let templateRegistroAdministrador = paginaRegistroAdministrador.content.querySelector(".wrapper");
//CAPTURA DEL TEMPLATE QUE MUESTRA LOS SERVICIOS DISPONIBLES DEL SIMULADOR Y SU CONTENIDO
let paginaServicios = document.querySelector("#paginaServicios");
let templateServicios = paginaServicios.content.querySelector(".wrapper");
//CAPTURA DE LOS ELEMENTOS Y CARD PARA MOSTRAR LOS SERVICIOS
let serviciosInner = templateServicios.querySelector(".servicios");
serviciosInner.style.background = "none";
let cardServiciosInnerIndex = serviciosInner.querySelector(".cardServicios");
cardServiciosInnerIndex.remove();


//FUNCION DE INICIO DEL SIMULADOR
function cliente() {
	let inputTextNomUsuario = templateIndex.querySelector(".nombreUsuario");
	const nombre = inputTextNomUsuario.value;

	let inputTextPassUsuario = templateIndex.querySelector(".passUsuario");
	const pass = inputTextPassUsuario.value;

	if(!localStorage.getItem("usuarios")){
        //registro nuevo usuario
        templateIndex.remove();
		paginaIndex.remove();

		main.appendChild(templateRegistroAdministrador);
		nuevoUsuario();
    } else{
        const usuariosBajada = JSON.parse(localStorage.getItem("usuarios"));
        
        for (const usuario of usuariosBajada) {
            if (usuario.nombre == nombre && usuario.password == pass) {
                sessionStorage.setItem("UsuarioActual", JSON.stringify([]));
                usuarioActual = [{nombre: usuario.nombre,password:usuario.password,telefono:usuario.telefono}];
                let datosUsuario= JSON.stringify(usuarioActual);
                //Vacío el elemento en el sessionStorage
                sessionStorage.setItem("usuarioActual",datosUsuario);
                administracionServicios();
                    
            } else {
                //registro nuevo usuario
                templateAdministrador.remove();
                paginaAdministrador.remove();

                main.appendChild(templateRegistroAdministrador);
                nuevoUsuario();
            }
        }
    }
}
//FUNCION DEL MENU DE USUARIO
function administracionServicios() {
	templateIndex.remove();
	paginaIndex.remove();
	main.appendChild(templateAdministrador);

	botonera = templateAdministrador.querySelector(".botonera");
	botonera.classList.add("d-flex");
	botonera.classList.add("flex-column");
	botonera.classList.add("flex-nowrap");
	botonera.classList.add("justify-content-center");
	botonera.classList.add("align-items-center");

	agregar.addEventListener("click", () => {
		templateAdministrador.remove();
		paginaAdministrador.remove();

		main.appendChild(templateRegistroAdministrador);
		nuevoUsuario();
	});

	eliminar.addEventListener("click", () => {
		templateAdministrador.remove();
		paginaAdministrador.remove();

		main.appendChild(templateEliminarUsuario);
		eliminarAdministrador();
	});

	salir.addEventListener("click", () => {
		templateAdministrador.remove();
		paginaAdministrador.remove();

		main.appendChild(templateIndex);
	});
}
//FUNCION QUE AGREGA NUEVO USUARIO
function nuevoUsuario() {
	let formularioRegistroNuevoAdministrador = templateRegistroAdministrador.querySelector(".registroNuevoUsuario");

	formularioRegistroNuevoAdministrador.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const datos = Object.fromEntries(formData.entries());
        
        let nombreNuevoUsu = datos.nombreUsuario;
		let passNuevoUsu = datos.passUsuario;
        let telNuevoUsu = datos.telUsuario;
        
		const usuarios = { nombre: nombreNuevoUsu, password: passNuevoUsu, telefono: telNuevoUsu };
        usuariosGuardados = [];

        // Compruebo si existe el elemento en localStorage, si no está, lo creo
        if (!localStorage.getItem("usuarios")) {
            //guardo datos del usuario actual en el sessionstorage
            sessionStorage.setItem("usuarioActual",JSON.stringify(usuarios));
            usuariosGuardados.push(usuarios);
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
            e.target.reset();
            templateRegistroAdministrador.remove();
            paginaRegistroAdministrador.remove();
            administracionServicios();
        } else{
            //bajo los usuarios guardados en el localstorage
            usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
            //Vacío el elemento en el localStorage
            localStorage.setItem("usuarios", JSON.stringify([]));
            //Comienza el bucle y evalúo si el elemento existe ya en localStorage
            usuariosGuardados.forEach( element => {
                if((element.nombre === nombreNuevoUsu) || (nombreNuevoUsu === "")){
                    //Si el elemento ya existe, validador se queda en false
                    validador = false;
                }else if ((element.nombre !== nombreNuevoUsu) && (nombreNuevoUsu !== "")){
                    //si no existe el elemento, validador se vuelve true
                    validador = true;
                }
            });
            // Fuera del bucle, si validador es true, entonces se agrega el elemento nuevo al array y se sube al localstorage
            if (validador == true) {
                sessionStorage.setItem("usuarioActual",JSON.stringify(usuarios));
                usuariosGuardados.push(usuarios);
                localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
                e.target.reset();
                templateRegistroAdministrador.remove();
                paginaRegistroAdministrador.remove();
                administracionServicios();
            //Si no, no agrega nada y sube directamente al localstorage
            } else {
                sessionStorage.setItem("usuarioActual",JSON.stringify(usuarios));
                localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
                e.target.reset();
                templateRegistroAdministrador.remove();
                paginaRegistroAdministrador.remove();
                administracionServicios();
            }
        }     
	});

	let siguienteUsuario = templateRegistroAdministrador.querySelector(".salir");
	siguienteUsuario.addEventListener("click", () => {
		templateRegistroAdministrador.remove();
		paginaRegistroAdministrador.remove();

		main.appendChild(templateAdministrador);
		administracionServicios();
	});
}
//FUNCION DEL MENU DE ADMINISTRACION DE SERVICIOS
function administracionServicios() {
	templateIndex.remove();
	paginaIndex.remove();
	main.appendChild(templateAdministrador);

	botonera = templateAdministrador.querySelector(".botonera");
	botonera.classList.add("d-flex");
	botonera.classList.add("flex-column");
	botonera.classList.add("flex-nowrap");
	botonera.classList.add("justify-content-center");
	botonera.classList.add("align-items-center");

	agregar.addEventListener("click", () => {
		templateAdministrador.remove();
		paginaAdministrador.remove();

		main.appendChild(templateServicios);
		agendarServicio();
	});

	eliminar.addEventListener("click", () => {
		templateAdministrador.remove();
		paginaAdministrador.remove();

		main.appendChild(templateEliminarUsuario);
		eliminarAgenda();
	});

	salir.addEventListener("click", () => {
		templateAdministrador.remove();
		paginaAdministrador.remove();
        location.reload(true);
		main.appendChild(templateIndex);
	});
}
function agendarServicio(){
    //BAJO DEL LOCALSTORAGE LOS SERVICIOS
    let serviciosBajados = JSON.parse(localStorage.getItem("servicios"));
    //POR CADA SERVICIO MUESTRE UNA CARD CON LAS ESPESIFICACIONES
    serviciosBajados.forEach(element => {
        let cardServiciosInnerIndexClonada = cardServiciosInnerIndex.cloneNode(true);
        let parrfCardServiciosInnerClonada = cardServiciosInnerIndexClonada.querySelector("p");
        let imgCardServiciosInnerClonada = cardServiciosInnerIndexClonada.querySelector("img");
        imgCardServiciosInnerClonada.setAttribute("src",`${element.img}`);
        parrfCardServiciosInnerClonada.textContent = `${element.titulo}\n\nDESCRIPCION: ${element.des}\nHORA DE TRATAMIENTO: ${element.horaTrata} HORAS`;
        serviciosInner.appendChild(cardServiciosInnerIndexClonada);
        let servicioId = element.id;
        let botonAgendar = cardServiciosInnerIndexClonada.querySelector("button");
        botonAgendar.setAttribute("id",`${servicioId}`);
        botonAgendar.addEventListener("click",agregarServicios);
    });
}
//funcion que agrega a la agenda los servicios que quiere agendar
function agregarServicios(e){
    usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
    agendaCliente = servicios.find( serv => serv.id == e.target.id);
    const cliente = {...usuarioActual};
    let agendaServicios = [...cliente,...agendaCliente];
    if(!localStorage.getItem("agendaServicios")){
        
        let agendaClienteJson = JSON.stringify(agendaServicios);
        localStorage.setItem("agendaServicios",agendaClienteJson);
    }else{
        agendaServiciosBajados = JSON.parse(localStorage.getItem("agendaServicios"));
        agendaServiciosBajados.push(agendaServicios);
        agendaClienteJson = JSON.stringify(agendaServicios);
        localStorage.setItem("agendaServicios",agendaClienteJson);
    }
}