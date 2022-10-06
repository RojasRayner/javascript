//ARRAY DE SERVICIOS Y SUBIDA AL LOCALSTORAGE
const servicios = [{titulo:"Limieza Facial",des:"Procedimiento que elimina todas las impurezas que se encuentran en la piel generadas por el mismo cuerpo y por el ambiente.",precio:300,horaTrata:1,img:"../images/productos/limpiezaFacial.png",id:1},{titulo:"Maniqura",des:" Tratamiento de belleza cosmético para las uñas y manos",precio:600,horaTrata:2,img:"../images/productos/maniqura.png",id:2},{titulo:"Pediqura",des:"Tratamiento de belleza cosmético para las uñas y pies.",precio:600,horaTrata:2,img:"../images/productos/pediqura.png",id:3}];
let serviciosJson = JSON.stringify(servicios);
localStorage.setItem("servicios", serviciosJson);
let usuarioActual = (JSON.parse(sessionStorage.getItem("usuarioActual"))) || [];
//VARIABLES DE GUARDADOS DE DATOS
const horaDeTrabajo = [];
const agendaServicios = [];
//COMIENZO DEL SCRIPT QUE PERMITE A LOS CLIENTES AGENDAR SERVICIOS
//SE CAPTURA EL ELEMENTO MAIN DEL HTML SERA EL NODO PADRE
let main = document.querySelector("main");
//CAPTURA DEL TEMPLATE INDEX DEL SIMULADOR Y SU CONTENIDO
let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");
main.appendChild(templateIndex);
let formularioUsuario = templateIndex.querySelector(".entrada");
formularioUsuario.addEventListener("submit", cliente);
let formularioNuevoUsuario = templateIndex.querySelector(".botonNuevoUsuario");
formularioNuevoUsuario.addEventListener("submit",nuevoUsuario);
//CAPTURA DEL TEMPLATE DEL MENU DE USUARIO Y SUS BOTONES
let paginaAdministradorServicios = document.querySelector("#paginaAdministradorServicios");
let templateAdministradorServicios = paginaAdministradorServicios.content.querySelector(".wrapper");
let agregar = templateAdministradorServicios.querySelector(".agregar");
let eliminar = templateAdministradorServicios.querySelector(".eliminar");
let salir = templateAdministradorServicios.querySelector(".salir");
//CAPTURA DEL TEMPLATE DE REGISTRO NUEVO USUARIO Y SU CONTENIDO
let paginaRegistroUsuario = document.querySelector("#paginaRegistro");
let templateRegistroUsuario = paginaRegistroUsuario.content.querySelector(".wrapperRegistro");
//CAPTURA DEL TEMPLATE QUE MUESTRA LOS SERVICIOS DISPONIBLES DEL SIMULADOR Y SU CONTENIDO
let paginaServicios = document.querySelector("#paginaServicios");
let templateServicios = paginaServicios.content.querySelector(".wrapper");
//CAPTURA DE LOS ELEMENTOS Y CARD PARA MOSTRAR LOS SERVICIOS SE ELIMINA EL NODO MOLDE
let serviciosInner = templateServicios.querySelector(".servicios");
serviciosInner.style.background = "none";
let cardServiciosInnerIndex = serviciosInner.querySelector(".cardServicios");
cardServiciosInnerIndex.remove();
//CAPTURA DE ICONO QUE MUESTRA UN EVENTO QUE LLEVA CARRITO DE COMPRA
let header = document.querySelector("header");
let imgCarrito = header.querySelector("i");
imgCarrito.classList.add("imgCarrito");
imgCarrito.addEventListener("click",verCarrito);
//CAPTURA DE LOS ELEMENTOS Y CARD DE LA AGENDA ASIGNADA POR USUARIO
let paginaCarrito = document.querySelector("#paginaCarrito");
let templateCarrito = paginaCarrito.content.querySelector(".wrapper");
let carritoInner = templateCarrito.querySelector(".carrito");
let cardCarritoInnerIndex = carritoInner.querySelector(".cardCarrito");
cardCarritoInnerIndex.remove();
carritoInner.style.background = "none";
let carritoRegresar = templateCarrito.querySelector(".carritoRegresar");
let carritoComprados = templateCarrito.querySelector(".carritoComprar");
//ELEMENTOS QUE SE MUESTRAN SI EL CARRITO ESTA VACIO
let agregarH2 = document.createElement("h2");
let regresoBtn = document.createElement("button");
regresoBtn.innerHTML = "<button class=btn btn-primary mb-1 btn-lg type=button>REGRESAR</button>";
agregarH2.innerHTML = "<h2>NO TIENES PRODUCTOS NI SERVICIOS EN TU CARRITO</h2>";

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

		nuevoUsuario();
    } else{
        const usuariosBajada = JSON.parse(localStorage.getItem("usuarios"));

        for (const usu of usuariosBajada) {

            if ((usu.nombre == nombre) && (usu.password == pass)) {
                //Vacío el elemento en el sessionStorage
                sessionStorage.setItem("usuarioActual", JSON.stringify([]));
                usuarioActual = {nombre: usu.nombre,password:usu.password,telefono:usu.telefono};
                let datosUsuario= JSON.stringify(usuarioActual);
                //subo nueva sesion
                sessionStorage.setItem("usuarioActual",datosUsuario);
                templateIndex.remove();
                paginaIndex.remove();

                administracionServicios();
                    
            } else {
                //Vacío el elemento en el sessionStorage
                sessionStorage.setItem("usuarioActual", JSON.stringify([]));
                usuarioActual = {nombre: usu.nombre,password:usu.password,telefono:usu.telefono};
                let datosUsuario= JSON.stringify(usuarioActual);
                //subo nueva sesion
                sessionStorage.setItem("usuarioActual",datosUsuario);
                //registro nuevo usuario
                templateIndex.remove();
                paginaIndex.remove();

                nuevoUsuario();
            }
        }
    }
}
//FUNCION QUE AGREGA NUEVO USUARIO
function nuevoUsuario() {
    templateIndex.remove();
    paginaIndex.remove();
    main.appendChild(templateRegistroUsuario);
	let formularioRegistroNuevoUsuario = templateRegistroUsuario.querySelector(".registroNuevoUsuario");

	formularioRegistroNuevoUsuario.addEventListener("submit", (e) => {
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
            templateRegistroUsuario.remove();
            paginaRegistroUsuario.remove();
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
                templateRegistroUsuario.remove();
                paginaRegistroUsuario.remove();
                administracionServicios();
            //Si no, no agrega nada y sube directamente al localstorage
            } else {

                localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
                e.target.reset();
                templateRegistroUsuario.remove();
                paginaRegistroUsuario.remove();
                administracionServicios();
            }
        }     
	});

	let salirMenuPrincipal = templateRegistroUsuario.querySelector(".salir");
	salirMenuPrincipal.addEventListener("click", () => {
		templateRegistroUsuario.remove();
		paginaRegistroUsuario.remove();

		//location.reload(true);
	});
}
//FUNCION DEL MENU DE ADMINISTRACION DE SERVICIOS
function administracionServicios() {
    
	main.appendChild(templateAdministradorServicios);
    
	botonera = templateAdministradorServicios.querySelector(".botonera");
	botonera.classList.add("d-flex");
	botonera.classList.add("flex-column");
	botonera.classList.add("flex-nowrap");
	botonera.classList.add("justify-content-center");
	botonera.classList.add("align-items-center");

	agregar.addEventListener("click", () => {
		templateAdministradorServicios.remove();
		paginaAdministradorServicios.remove();

		agendarServicio();
	});

	eliminar.addEventListener("click", () => {
		templateAdministradorServicios.remove();
		paginaAdministradorServicios.remove();

		main.appendChild(templateEliminarUsuario);
		eliminarAgenda();
	});

	salir.addEventListener("click", () => {
		templateAdministradorServicios.remove();
		paginaAdministradorServicios.remove();
        location.reload(true);
		main.appendChild(templateIndex);
	});
}
function agendarServicio(){
    //AL ACCEDER DESDE NUEVO USUARIO, SE ELIMINA LA PAGINA
    templateRegistroUsuario.remove();
	paginaRegistroUsuario.remove();
    //SE AGREGA LA PAGINA AGENDAR SERVICIOS
    main.appendChild(templateServicios);
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
    serviciosAlmacenados = JSON.parse(localStorage.getItem("servicios"));
    let agendaCliente = serviciosAlmacenados.find( serv => serv.id == e.target.id);
    //SUMAMOS LOS DOS OBJETOS Y LO AGREGAMOS AL ARRAY AGENDASERVICIOS
    let agendaObj = Object.assign({},usuarioActual,agendaCliente);
    agendaServicios.push(agendaObj);
    //si no esta el localstorage esta el elemento agendaservicios, almacene directamente el servicio 
    if(!localStorage.getItem("agendaServicios")){
        let agendaClienteJson = JSON.stringify(agendaServicios);
        localStorage.setItem("agendaServicios",agendaClienteJson);
    }else{
        //si ya hay algun servicio entonces primero baje del localstorage la agendaservicos y luego sumele lo nuevo y guarde nuevamente en el localstorage 
        let agendaServiciosBajados = JSON.parse(localStorage.getItem("agendaServicios"));
        let agenda = [...agendaServiciosBajados,...agendaServicios];
        agendaClienteJson = JSON.stringify(agenda);
        localStorage.setItem("agendaServicios",agendaClienteJson);
    }
    Swal.fire({
        text: 'Servicio agregado a carrito',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    })

}
//FUNCION QUE MUESTRA EL CARRITO DE SERVICIOS AGENDADOS POR USUARIO
function verCarrito(e){
    //SI SE ACCEDE DESDE LA PAGINA INDEX, SE ELIMINA ESA PAGINA
    templateIndex.remove();
    paginaIndex.remove();
    //SI SE ACCEDE DESDE NUEVO USUARIO, SE ELIMINA ESA PAGINA
    templateRegistroUsuario.remove();
    paginaRegistroUsuario.remove();
    //SI SE ACCEDE DESDE ADMINISTRACION SERVICIO
    templateAdministradorServicios.remove();
	paginaAdministradorServicios.remove();
    //SI SE ACCEDE DESDE AGENDAR SERVICIOS, SE ELIMINA ESA PAGINA
    templateServicios.remove();
    paginaServicios.remove();
    //SE AGREGA AL MAIN LA PAGINA CARRITO
    main.appendChild(templateCarrito);
    
    if(!localStorage.getItem("agendaServicios")){
        templateCarrito.appendChild(agregarH2);
        templateCarrito.appendChild(regresoBtn);
        regresoH2.addEventListener("click",regresoIndex(regreso,agregar,carritoCompra));
    }else{
        agendaServiciosGuardada = (JSON.parse(localStorage.getItem("agendaServicios")));
        
        if(agendaServiciosGuardada.length !== 0){
            usuarioActual = (JSON.parse(sessionStorage.getItem("usuarioActual")));
            let totalCompra = 0;
            for (let [posicion,element] of agendaServiciosGuardada.entries()) {
                while((element.nombre === usuarioActual.nombre) && (element.password === usuarioActual.password) && (element.telefono === usuarioActual.telefono)){
                    let cardCarritoInnerIndexClonada = cardCarritoInnerIndex.cloneNode(true);
                    cardCarritoInnerIndexClonada.classList.add(`${posicion}`);
                    let imgCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("img");
                    imgCardCarritoInnerIndexClonada.setAttribute("src",`${element.img}`);
                    let parrfCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("p");
                    parrfCardCarritoInnerIndexClonada.textContent = `Horas de Tratamiento: ${element.horaTrata}\tPrecio: ${element.precio}$`;
                    let labelCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("label");
                    labelCardCarritoInnerIndexClonada.textContent = `${element.titulo}`;
                    let inputCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("input");
                    inputCardCarritoInnerIndexClonada.setAttribute("max",`${element.cant}`);
                    inputCardCarritoInnerIndexClonada.setAttribute("disabled",true);
                    totalCompra = totalCompra + (element.precio * 1);
                    let buttonCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("button");
                    buttonCardCarritoInnerIndexClonada.addEventListener("click", eliminarServicio);
                    buttonCardCarritoInnerIndexClonada.setAttribute("id",`${element.id}`);
                    carritoInner.appendChild(cardCarritoInnerIndexClonada);
                    break;
                }
            };
            let spanCarritoInnerIndex = carritoInner.querySelector("span");
            spanCarritoInnerIndex.textContent = `TOTAL DE COMPRA: ${totalCompra}`;
    
        }else{
            templateCarrito.appendChild(agregarH2);
            templateCarrito.appendChild(regresoBtn);
            regresoBtn.addEventListener("click",regresoIndex);
        }
    }
    carritoComprados.addEventListener("click", carritoCompraProductos);
    carritoRegresar.addEventListener("click", regresoIndex);
}
//FUNCION QUE ELIMINA LOS SERVICIOS AGENDADOS EN EL CARRITO
function eliminarServicio(e){
    agendaServiciosGuardada = (JSON.parse(localStorage.getItem("agendaServicios")));
    usuarioActual = (JSON.parse(sessionStorage.getItem("usuarioActual")));
    //recorremos la agendaguardada en el localstorage y remplazamos en la posicion del servicio a eliminar el objeto servicio eliminado
    for (let [index,val] of agendaServiciosGuardada.entries()) {
        //buscar los elementos por usuarioactual en agenda
        if((val.nombre == usuarioActual.nombre) && (val.password == usuarioActual.password) && (val.telefono == usuarioActual.telefono) && (val.id == e.target.id)){
            let servicioEliminado = {titulo:"SERVICIO ELIMINADO POR EL USUARIO"};
            agendaServiciosGuardada.splice(index,1,servicioEliminado)
        }
    }
    //subir a la agenda los servicios que quedan
    localStorage.setItem("agendaServicios",JSON.stringify(agendaServiciosGuardada));
    //remplazamos el nodo eliminado por el texto servicio eliminado
    for (let i = 0; i < carritoInner.childNodes.length; i++){
        while(carritoInner.childNodes[i] === e.target.offsetParent){
            carritoInner.childNodes[i].innerText = "SERVICIO ELIMINADO";
            break;
        }
    }
}
//FUNCION DE REGRESO AL INDEX
function regresoIndex(){
    regresoBtn.remove();
    agregarH2.remove();
    location.reload(true);
}
//funcion que ejecuta la compra de los productos en carrito
function carritoCompraProductos(e) {
    (async () => {
        const steps = ['1', '2']
        const Queue = Swal.mixin({
            progressSteps: steps,
            confirmButtonText: 'Next >',
            // optional classes to avoid backdrop blinking between steps
            showClass: { backdrop: 'swal2-noanimation' },
            hideClass: { backdrop: 'swal2-noanimation' }
        })

        await Queue.fire({
            title: 'Usuario',
            text:`Nombre: ${usuarioActual.nombre}\nTelefono: ${usuarioActual.telefono}`,
            currentProgressStep: 0,
            // optional class to show fade-in backdrop animation which was disabled in Queue mixin
            showClass: { backdrop: 'swal2-noanimation' },
        })

        await Queue.fire({
            title: 'Compra asegurada',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
            currentProgressStep: 1,
            confirmButtonText: 'OK',
            // optional class to show fade-out backdrop animation which was disabled in Queue mixin
            showClass: { backdrop: 'swal2-noanimation' },
        })
        
        if(opcion){
            let agendaServiciosFinal = JSON.parse(localStorage.getItem("agendaServicios")) || [];
            console.log(agendaServiciosFinal)
            for (const iterator of agendaServiciosFinal) {
                let agendaObj = Object.assign({},usuarioActual,iterator);
                console.log(agendaObj)
                agendaServiciosFinal.push(agendaObj);
            }
            localStorage.setItem("comprasServicioRealizadas",JSON.stringify(agendaServiciosFinal));
            localStorage.setItem("agendaServicios",JSON.stringify([]));
            //location.reload(true);
        }

    })()
}