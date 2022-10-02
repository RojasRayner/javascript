/* SEGUNDA ENTREGA DEL PROYECTO final
OBJETIVOS: CODIFICAR FUNCIONES DE PROCESOS ESENCIALES Y NOTIFICACION DE RESULTADOS POR HTMLAllCollection, ANADIENDO INTERACCION AL SIMULADOR
OBJETIVOS: AMPLIAR Y REFINAR EL FLUJO DE TRABAJO DEL SCRIPT EN TERMINOS DE CAPTURA DE EVENTOS, PROCESAMIENTOS DEL SIMULADOR Y NOTOFICACION DE RESULTADOS EN FORMA DE SALIDAS POR HTML, MODIFICANDO EL DOM.

OBJETIVOS ESPESIFICOS: DEFINIR EVENTOS A MANEJAR Y SU FUNCION DE RESPUESTA
OBJETIVOS ESPESIFICOS: MODIFICAR EL DOMException,YA SEA PARA DEFINIR ELEMENTOS AL CARGAR LA PAGINA O PARA REALIZAR SALIDAS DE UN PROCESAMIENTOS.
OBJETIVOS ESPESIFICOS: ALMACENAR DATOS EN EL STORAGE Y RECUPERARLOS */
//IMPLEMENTACIOPN CON USO DE JSON Y STORAGE
//MODIFICACION DEL DOM Y DETECCION DE EVENTOS DE USURAIO

//VARIABLES
const administradores = [{ administrador: "admin", password: "admin" }];
localStorage.setItem("administradores",JSON.stringify(administradores));
let main = document.querySelector("main");
//CAPTURA DEL TEMPLATE INDEX DEL SIMULADOR Y SU CONTENIDO
let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");
main.appendChild(templateIndex);
let formularioUsuario = templateIndex.querySelector(".entrada");
formularioUsuario.addEventListener("submit", cliente);
//CAPTURA DEL TEMPLATE DEL MENU DE ADMINISTRADOR Y SU CONTENIDO
let paginaAdministrador = document.querySelector("#paginaAdministrador");
let templateAdministrador =
	paginaAdministrador.content.querySelector(".wrapper");
let agregar = templateAdministrador.querySelector(".agregar");
let eliminar = templateAdministrador.querySelector(".eliminar");
let salir = templateAdministrador.querySelector(".salir");
//CAPTURA DEL TEMPLATE DE REGISTRO NUEVO ADMINISTRADOR Y SU CONTENIDO
let paginaRegistroAdministrador = document.querySelector("#paginaRegistro");
let templateRegistroAdministrador = paginaRegistroAdministrador.content.querySelector(".wrapper");
//CAPTURA DEL TEMPLATE DE ELIMINAR ADMINISTRADOR Y SU CONTENIDO
let paginaEliminarUsuario = document.querySelector("#eliminarUsuario");
let templateEliminarUsuario =
	paginaEliminarUsuario.content.querySelector(".wrapper");
let formularioEliminarAdministrador =
	templateEliminarUsuario.querySelector(".inner");
//FUNCION DE INICIO DEL SIMULADOR
function cliente() {
	let inputTextNomUsuario = templateIndex.querySelector(".nombreUsuario");
	const nombre = inputTextNomUsuario.value;

	let inputTextPassUsuario = templateIndex.querySelector(".passUsuario");
	const pass = inputTextPassUsuario.value;

	const adminBajada = JSON.parse(localStorage.getItem("administradores")) || [];

	const usuarios = [...administradores, ...adminBajada];

	for (const usuario of usuarios) {
		if (usuario.administrador == nombre && usuario.password == pass) {
			admin();
		} else {
			let h4Advertencia = templateIndex.querySelector("h4").textContent = "NO ES ADMINISTRADOR";
		}
	}
}
//FUNCION DEL MENU DE ADMINISTRADOR
function admin() {
	templateIndex.remove();
	paginaIndex.remove();
	main.appendChild(templateAdministrador);
	let headingDos = (templateAdministrador.querySelector("h2").textContent =
		"ADMINISTRADOR");
	let headingUno = (templateAdministrador.querySelector("h1").textContent =
		"CENTRO ESTETICO");
	let headingTres = (templateAdministrador.querySelector("h3").style.color =
		"red");

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
		nuevoAdministrador();
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
//FUNCION QUE AGREGA NUEVO ADMINISTRADOR
function nuevoAdministrador() {
	let formularioRegistroNuevoAdministrador = templateRegistroAdministrador.querySelector(".registroNuevoUsuario");

	formularioRegistroNuevoAdministrador.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const datos = Object.fromEntries(formData.entries());
        
        let nuevoAdmin = datos.nombreUsuario;
		let nuevaPass = datos.passUsuario;
        
		const administrador = { administrador: nuevoAdmin, password: nuevaPass };
        AdministradoresGuardados = [];

        // Compruebo si existe el elemento en localStorage, si no está, lo creo
        if (!localStorage.getItem("administradores")) {
            
            AdministradoresGuardados.push(administrador);
            localStorage.setItem("administradores", JSON.stringify(AdministradoresGuardados));
            e.target.reset();
            templateRegistroAdministrador.remove();
            paginaRegistroAdministrador.remove();
            admin();
        } else{

            AdministradoresGuardados = JSON.parse(localStorage.getItem("administradores"));
            //Vacío el elemento en el localStorage
            localStorage.setItem("administradores", JSON.stringify([]));
            //Comienza el bucle y evalúo si el elemento existe ya en localStorage
            AdministradoresGuardados.forEach( element => {
                if((element.administrador === nuevoAdmin) || (nuevoAdmin === "")){
                    //Si el elemento ya existe, validador se queda en false
                    validador = false;
                }else if ((element.administrador !== nuevoAdmin) && (nuevoAdmin !== "")){
                    //si no existe el elemento, validador se vuelve true
                    validador = true;
                }
            });
            // Fuera del bucle, si validador es true, entonces se agrega el elemento nuevo
            if (validador == true) {
                AdministradoresGuardados.push(administrador);
                localStorage.setItem("administradores", JSON.stringify(AdministradoresGuardados));
                e.target.reset();
                templateRegistroAdministrador.remove();
                paginaRegistroAdministrador.remove();
                admin();
            //Si no, no agrega nada
            } else {
                localStorage.setItem("administradores", JSON.stringify(AdministradoresGuardados));
                e.target.reset();
                templateRegistroAdministrador.remove();
                paginaRegistroAdministrador.remove();
                admin();
            }
        }     
	});

	let salir = templateRegistroAdministrador.querySelector(".salir");
	salir.addEventListener("click", () => {
		templateRegistroAdministrador.remove();
		paginaRegistroAdministrador.remove();

		main.appendChild(templateAdministrador);
		admin();
	});
}
//FUNCION QUE ELIMINA ADMINISTRADOR
function eliminarAdministrador() {
    if (!localStorage.getItem("administradores")){
        h2EliminarUsuario = templateEliminarUsuario.querySelector("h2").textContent = "NO HAY ADMINISTRADORES PARA ELIMINAR"
    } else{
        AdministradoresGuardados = JSON.parse(localStorage.getItem("administradores"));
        let table = templateEliminarUsuario.querySelector(".table")
        let rowAdministradores = templateEliminarUsuario.querySelector(".elementoAdministrador")
        h2EliminarUsuario = templateEliminarUsuario.querySelector("h2").textContent = `ADMINISTRADORES ${AdministradoresGuardados.length}`;
        for (let [index,val] of AdministradoresGuardados.entries()) {
            
            let tr = document.createElement("tr");
            tr.setAttribute("id",`${index}`)
            let tds = [index,val.administrador, val.password];
            
            for(let i = 0; i < tds.length; ++i) {
                

                let td = document.createElement('td');

                td.appendChild(document.createTextNode(tds[i]));
                tr.appendChild(td);
                rowAdministradores.appendChild(tr);
            }
            let botonBorrar = document.createElement("button");
            botonBorrar.innerHTML = `<button type="button" class="btn btn-primary">ELIMINAR</button>`;
            tr.appendChild(botonBorrar);
            botonBorrar.addEventListener("click", eliminarElementoTabla);
            
        }
        table.appendChild(rowAdministradores);
    }
}
//funcion que elimina la lista de la tabla
function eliminarElementoTabla(e){
    console.log(e.target)
    let adminId = e.target.parentNode.id;
    AdministradoresGuardados = JSON.parse(localStorage.getItem("administradores"));
    //Vacío el localStorage
    localStorage.setItem("administradores", JSON.stringify([]));
    //busco y confirmo el indice del administrador dentro del array
    let usuarioIndex = AdministradoresGuardados.indexOf(adminId);
    //borro del array el administrador
    AdministradoresGuardados.splice(usuarioIndex,1);
    //guardo los administradores restantes en el localstorage
    localStorage.setItem("administradores", JSON.stringify(AdministradoresGuardados));
    e.target.parentNode.remove();
}
