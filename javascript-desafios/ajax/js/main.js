async function fetchProductos() {
    const respuesta = await fetch('./data/dataProducto.json');
    return await respuesta.json();
}

let productos =[];

fetchProductos().then(elementos => {
    productos = elementos;
    mostrarProductosGuardados();
});

const carritoCompra = (JSON.parse(localStorage.getItem("carritoCompra"))) || [];
let agendaServicios = [];

let main = document.querySelector("main");

let paginaCliente = document.querySelector("#paginaCliente");
let templateCliente = paginaCliente.content.querySelector(".wrapper");
let innerCliente = templateCliente.querySelector(".inner")

let inputTextNomUsuario = templateCliente.querySelector(".nombreUsuario");
inputTextNomUsuario.setAttribute("required", true);

let inputTextPassUsuario = templateCliente.querySelector(".passUsuario");
inputTextPassUsuario.setAttribute("required", true);
//CAPTURA DEL TEMPLATE INDEX
let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");
main.appendChild(templateIndex);

//CAPTURA DEL ICONO CARRITO Y ASIGNACION DE EVENTO
let header = document.querySelector("header");
let imgCarritoProductos = header.querySelector(".cartProductos");
let imgCarritoServicios = header.querySelector(".cartServicios");
let enlaceServicios = header.querySelector(".enlaceServicio");
let enlaceProductos = header.querySelector(".enlaceProducto");
enlaceProductos.style.display = "none";
enlaceProductos.addEventListener("click",volverPaginaProductos)
imgCarritoProductos.addEventListener("click",verCarritoProductos);
imgCarritoServicios.addEventListener("click",verCarritoServicios);
imgCarritoServicios.style.display = "none";
enlaceServicios.addEventListener("click",agendarServicio);

//ELEMENTOS QUE SE MUESTRAN SI EL CARRITO ESTA VACIO
let agregar = document.createElement("h2");
let regreso = document.createElement("button");
regreso.innerHTML = "<button class=btn btn-primary entrar mb-1 btn-lg type=button>REGRESAR</button>";
agregar.innerHTML = "<h2>NO TIENES PRODUCTOS NI SERVICIOS EN TU CARRITO</h2>";

//CAPTURA DE ICONO QUE MUESTRA UN EVENTO QUE LLEVA CARRITO DE COMPRA DE PRODUCTOS
let paginaCarritoProductos = document.querySelector("#paginaCarritoProductos");
let templateCarritoProductos = paginaCarritoProductos.content.querySelector(".wrapper");
let carritoInnerProductos = templateCarritoProductos.querySelector(".carrito");
let cardCarritoProductosInnerIndex = carritoInnerProductos.querySelector(".cardCarrito");
cardCarritoProductosInnerIndex.remove();
let carritoProductosRegresar = templateCarritoProductos.querySelector(".carritoRegresar");
let carritoProductosComprados = templateCarritoProductos.querySelector(".carritoComprar");
carritoInnerProductos.style.background = "none";

//CAPTURA DE LOS ELEMENTOS Y CARD DE LA AGENDA ASIGNADA POR USUARIO
let paginaCarritoServicios = document.querySelector("#paginaCarritoServicios");
let templateCarritoServicios = paginaCarritoServicios.content.querySelector(".wrapper");
let carritoInnerServicios = templateCarritoServicios.querySelector(".carrito");
let cardCarritoServiciosInnerIndex = carritoInnerServicios.querySelector(".cardCarrito");
cardCarritoServiciosInnerIndex.remove();
carritoInnerServicios.style.background = "none";
let carritoServiciosRegresar = templateCarritoServicios.querySelector(".carritoRegresar");
let carritoServiciosComprados = templateCarritoServicios.querySelector(".carritoComprar");

//CAPTURA DE LA CARD QUE MUESTRA LOS PRODUCTOS
let productosInner = templateIndex.querySelector(".productos");
productosInner.style.background = "none";
let cardProductosInnerIndex = productosInner.querySelector(".cardProductos");
cardProductosInnerIndex.remove();

//CAPTURA DEL TEMPLATE QUE MUESTRA LOS SERVICIOS DISPONIBLES DEL SIMULADOR Y SU CONTENIDO
let paginaServicios = document.querySelector("#paginaServicios");
let templateServicios = paginaServicios.content.querySelector(".wrapper");
//CAPTURA DE LOS ELEMENTOS Y CARD PARA MOSTRAR LOS SERVICIOS SE ELIMINA EL NODO MOLDE
let serviciosInner = templateServicios.querySelector(".servicios");
serviciosInner.style.background = "none";
let cardServiciosInnerIndex = serviciosInner.querySelector(".cardServicios");
cardServiciosInnerIndex.remove();

//FUNCION QUE MUESTRA EL CARRITO DE PRODUCTOS
function verCarritoProductos(e){
    agregar.remove();
    regreso.remove();
    templateIndex.remove();
    main.appendChild(templateCarritoProductos);
    let carritoCompraGuardada = carritoCompra;
    let totalCompra = 0;
    if((!(carritoCompraGuardada)) || (carritoCompraGuardada.length == 0)){
        templateCarritoProductos.appendChild(agregar);
    } else if(carritoCompraGuardada.length !== 0){
            carritoCompraGuardada.forEach(element => {
                let cardCarritoProductosInnerIndexClonada = cardCarritoProductosInnerIndex.cloneNode(true);
                let imgCardCarritoProductosInnerIndexClonada = cardCarritoProductosInnerIndexClonada.querySelector("img");
                imgCardCarritoProductosInnerIndexClonada.setAttribute("src",`${element.img}`);
                let parrfCardCarritoProductosInnerIndexClonada = cardCarritoProductosInnerIndexClonada.querySelector("p");
                parrfCardCarritoProductosInnerIndexClonada.textContent = `Para Piel: ${element.tipoDePiel}\tPrecio: ${element.precio}$`;
                let labelCardCarritoProductosInnerIndexClonada = cardCarritoProductosInnerIndexClonada.querySelector("label");
                labelCardCarritoProductosInnerIndexClonada.textContent = `${element.titulo}`;
                let inputCardCarritoProductosInnerIndexClonada = cardCarritoProductosInnerIndexClonada.querySelector("input");
                inputCardCarritoProductosInnerIndexClonada.setAttribute("max",`${element.cant}`);
                inputCardCarritoProductosInnerIndexClonada.setAttribute("disabled",true);
                totalCompra = totalCompra + (element.precio * 1);
                let buttonCardCarritoProductosInnerIndexClonada = cardCarritoProductosInnerIndexClonada.querySelector("button");
                buttonCardCarritoProductosInnerIndexClonada.addEventListener("click", eliminarProducto);
                buttonCardCarritoProductosInnerIndexClonada.setAttribute("id",`${element.id}`);
                carritoInnerProductos.appendChild(cardCarritoProductosInnerIndexClonada);
            });
            let spanCarritoProductosInnerIndex = carritoInnerProductos.querySelector("span");
            spanCarritoProductosInnerIndex.textContent = `TOTAL DE COMPRA: ${totalCompra}`;
    }
    carritoProductosComprados.addEventListener("click", carritoCompraProductos);
    carritoProductosRegresar.addEventListener("click", regresoIndex)
    
}
//FUNCION DE REGRESO AL INDEX
function regresoIndex(){
    regreso.remove();
    agregar.remove();
    location.reload(true);
}
//funcion que elimina productos del carrito de compra
function eliminarProducto(e){
    carritoCompraGuardada = carritoCompra;
    for (let [index,valor] of carritoCompraGuardada.entries()) {
        if(valor.id == e.target.id) carritoCompraGuardada.splice(index,1);
    }
    let productoCarritoEliminado = document.createElement("div");
    productoCarritoEliminado.innerHTML = `
                    <div class="card cardCarrito d-flex flex-row justify-content-around align-items-center">
                        <div>
                            <img src="./images/eliminado.png" alt="">
                        </div>
                        <div class="card-body">
                            <p>PRODUCTO ELIMINADO</p> 
                        </div>
                        <div class="mx-3">
                            <label for="cantidad" class="form-label">Productos a Comprar</label>
                            <input type="number" class="form-control" min="1" max="" id="cantidad" value="0" disabled>
                        </div>
                        <div class="d-flex justify-content-center align-items-center mx-2">
                            <h2><button type="button" class="btn-close" aria-label="Close"></button></h2>
                        </div>
                    </div>`;

    for (let index = 0; index < carritoInner.childNodes.length; index++) {
        while(carritoInner.childNodes[index] === e.target.offsetParent){
            carritoInner.replaceChild(productoCarritoEliminado,carritoInner.childNodes[index]);
            break;
        }
    }
    localStorage.setItem("carritoCompra",JSON.stringify(carritoCompraGuardada));
}
//MOSTRAR POR CADA PRODUCTO UNA CARD CON SUS ESPESIFICACIONES
function mostrarProductosGuardados(){

    let productosGuardados = productos;

    productosGuardados.forEach(element => {
        let cardProductosInnerIndexClonada = cardProductosInnerIndex.cloneNode(true);
        let parrfCardProductosInnerIndexClonada = cardProductosInnerIndexClonada.querySelector("p");
        let imgCardProductosInnerIndexClonada = cardProductosInnerIndexClonada.querySelector("img");
        imgCardProductosInnerIndexClonada.setAttribute("src",`${element.img}`);
        parrfCardProductosInnerIndexClonada.textContent = `${element.titulo}.\n\nTIPO DE PIEL: ${element.tipoDePiel}\nPRECIO: ${element.precio}$\nCANTIDAD EN EXISTENCIA: ${element.cant}`;
        productosInner.appendChild(cardProductosInnerIndexClonada);
        let productoId = element.id;
        let botonComprar = cardProductosInnerIndexClonada.querySelector("button");
        botonComprar.setAttribute("id",`${productoId}`);
        botonComprar.addEventListener("click",agregarProductos);
    });
}
//funcion que agrega al carrito los productos que quiere comprar
function agregarProductos(e){
    let posibleCompra = productos.find(prod => prod.id == e.target.id);
    if(!JSON.parse(localStorage.getItem("carritoCompra"))){
        carritoCompra.push(posibleCompra);
        localStorage.setItem("carritoCompra",JSON.stringify(carritoCompra));
        alertProductosCarrito();
    }else{
        let posibleCompraGuardada = carritoCompra;
        posibleCompraGuardada.push(posibleCompra);
        localStorage.setItem("carritoCompra",JSON.stringify(posibleCompraGuardada));
        alertProductosCarrito();
    }
}
//funcion que muestra el alert de agregar productos al carrito
function alertProductosCarrito(){
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Producto almacenado en carrito!',
        showConfirmButton: false,
        timer: 1500
    })
}
//funcion que ejecuta la compra de los productos en carrito
function carritoCompraProductos(e) {
    (async () => {
        const steps = ['1', '2', '3']
        const Queue = Swal.mixin({
            progressSteps: steps,
            confirmButtonText: 'Siguiente >',
            showClass: { backdrop: 'swal2-noanimation' },
            hideClass: { backdrop: 'swal2-noanimation' }
        })

        const { value: nombreComprador } = await Queue.fire({
            title: 'Ingresa tu nombre Completo',
            input: 'text',
            customClass: {
                validationMessage: 'my-validation-message'
            },
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage('Tu Nombre es Requerido')
                }
            },
            currentProgressStep: 0,
            // optional class to show fade-in backdrop animation which was disabled in Queue mixin
            showClass: { backdrop: 'swal2-noanimation' },
        })
        const { value: telComprador } = await Queue.fire({
            title: 'Ingresa tu numero de telefono',
            input: 'tel',
            customClass: {
                validationMessage: 'my-validation-message'
            },
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage('Tu Numero de telefono es Requerido')
                }
            },
            currentProgressStep: 1
        })

        await Queue.fire({
            title: 'Compra asegurada',
            text: `Comprador: ${nombreComprador}\nTelefono: ${telComprador}`,
            showConfirmButton: false,
            timer: 4000,
            icon: 'success',
            currentProgressStep: 2,
            confirmButtonText: 'OK',
            // optional class to show fade-out backdrop animation which was disabled in Queue mixin
            showClass: { backdrop: 'swal2-noanimation' },
        })

        if(telComprador){
            const comprasRealizadas = JSON.parse(localStorage.getItem("comprasRealizadas")) || [];
            const Comprador = {usuario:nombreComprador,telefono:telComprador};
            for (const iterator of carritoCompra) {
                let agendaObj = Object.assign({},Comprador,iterator);
                comprasRealizadas.push(agendaObj);
            }
            localStorage.setItem("comprasRealizadas",JSON.stringify(comprasRealizadas));
            localStorage.setItem("carritoCompra",JSON.stringify([]));
            location.reload(true);
        }

    })()
}
//FUNCION QUE MUESTRA LOS SERVICIOS A OFRESER AL USUARIO
function agendarServicio(){
    templateIndex.remove();
    enlaceServicios.style.display = "none";
    imgCarritoProductos.style.display = "none";
    imgCarritoServicios.style.display = "block";
    enlaceProductos.style.display = "block";
    main.appendChild(templateServicios);

    async function fetchServicio() {
        const respuesta = await fetch('./data/dataServicio.json');
        return await respuesta.json();
    }
    let servicios = [];
    
    fetchServicio().then(elementos => {
        servicios = elementos;
        sessionStorage.setItem("servicios",JSON.stringify(servicios));
        mostrarAgendaServicio(servicios);
    });
}

function mostrarAgendaServicio(servicios) {
    (async () => {
        const result = { value: formValues } = await Swal.fire({
            title: 'Registro de Usuario',
            html:
                '<input id="swal-input1" class="swal2-input" type="text" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" type="tel" pattern="[0-9]{9}" placeholder="Numero de Telefono">',
            focusConfirm: false,
            inputAttributes: {
                required: true
            },
            denyButtonText: 'Regresar',
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            customClass: {
                validationMessage: 'my-validation-message'
            },
            preConfirm: () => {
                if((document.getElementById('swal-input1').value == "") || (document.getElementById('swal-input2').value == "")){
                    Swal.showValidationMessage('Todos los datos son Requeridos')
                }else{
                    return {
                        nombre: document.getElementById('swal-input1').value,
                        telefono: document.getElementById('swal-input2').value
                    }
                }
            }
        })

        if (result.isConfirmed) {
            Swal.fire({text:'Bienvenido!', showConfirmButton: false,timer:1500, icon:'success'})
            sessionStorage.setItem("usuario",JSON.stringify(formValues));
        } else if (result.isDenied) {
            Swal.fire({
                text:'Regresaras al area de productos',
                showConfirmButton: false,
                timer: 1500,
                icon:'info'})
            volverPaginaProductos();
        }

        let serviciosBajados = servicios;
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
    })()
}
//funcion que agrega a la agenda los servicios que quiere agendar
function agregarServicios(e){
    usuarioActual = JSON.parse(sessionStorage.getItem("usuario"));
    serviciosAlmacenados = JSON.parse(sessionStorage.getItem("servicios"));
    let agendaCliente = serviciosAlmacenados.find( serv => serv.id == e.target.id);
    let agendaObj = Object.assign({},usuarioActual,agendaCliente);
    agendaServicios.push(agendaObj);
    if(localStorage.getItem("agendaServicios") || []){
        localStorage.setItem("agendaServicios",JSON.stringify(agendaServicios));
        alertServiciosCarrito();
    }else{
        let agendaServiciosBajados = JSON.parse(localStorage.getItem("agendaServicios"));
        let agenda = [...agendaServiciosBajados,...agendaServicios];
        localStorage.setItem("agendaServicios",JSON.stringify(agenda));
        alertServiciosCarrito();
    }
}
//funcion que muestra el alert de serviios en carrito
function alertServiciosCarrito(){
    Swal.fire({
        text: 'Servicio agregado a carrito',
        toast: true,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    })
}
//FUNCION QUE MUESTRA EL CARRITO DE SERVICIOS AGENDADOS POR USUARIO
function verCarritoServicios(e){
    templateServicios.remove();
    paginaServicios.remove();
    //SE AGREGA AL MAIN LA PAGINA CARRITO
    main.appendChild(templateCarritoServicios);
    agendaServiciosGuardada = (JSON.parse(localStorage.getItem("agendaServicios")));
    
    if(!localStorage.getItem("agendaServicios")){
        templateCarritoServicios.appendChild(agregar);
    }else if(agendaServiciosGuardada.length !== 0){
            usuarioActual = (JSON.parse(sessionStorage.getItem("usuario")));
            let totalCompra = 0;
            for (let [posicion,element] of agendaServiciosGuardada.entries()) {
                while((element.nombre === usuarioActual.nombre) && (element.password === usuarioActual.password) && (element.telefono === usuarioActual.telefono)){
                    let cardCarritoServiciosInnerIndexClonada = cardCarritoServiciosInnerIndex.cloneNode(true);
                    cardCarritoServiciosInnerIndexClonada.classList.add(`${posicion}`);
                    let imgCardCarritoServiciosInnerIndexClonada = cardCarritoServiciosInnerIndexClonada.querySelector("img");
                    imgCardCarritoServiciosInnerIndexClonada.setAttribute("src",`${element.img}`);
                    let parrfCardCarritoServiciosInnerIndexClonada = cardCarritoServiciosInnerIndexClonada.querySelector("p");
                    parrfCardCarritoServiciosInnerIndexClonada.textContent = `Horas de Tratamiento: ${element.horaTrata}\tPrecio: ${element.precio}$`;
                    let labelCardCarritoServiciosInnerIndexClonada = cardCarritoServiciosInnerIndexClonada.querySelector("label");
                    labelCardCarritoServiciosInnerIndexClonada.textContent = `${element.titulo}`;
                    let inputCardCarritoServiciosInnerIndexClonada = cardCarritoServiciosInnerIndexClonada.querySelector("input");
                    inputCardCarritoServiciosInnerIndexClonada.setAttribute("max",`${element.cant}`);
                    inputCardCarritoServiciosInnerIndexClonada.setAttribute("disabled",true);
                    totalCompra = totalCompra + (element.precio * 1);
                    let buttonCardCarritoServiciosInnerIndexClonada = cardCarritoServiciosInnerIndexClonada.querySelector("button");
                    buttonCardCarritoServiciosInnerIndexClonada.addEventListener("click", eliminarServicio);
                    buttonCardCarritoServiciosInnerIndexClonada.setAttribute("id",`${element.id}`);
                    carritoInnerServicios.appendChild(cardCarritoServiciosInnerIndexClonada);
                    break;
                }
            };
            let spanCarritoInnerIndex = carritoInnerServicios.querySelector("span");
            spanCarritoInnerIndex.textContent = `TOTAL DE COMPRA: ${totalCompra}`;
        }
    carritoServiciosComprados.addEventListener("click", carritoAgendarServicios);
    carritoServiciosRegresar.addEventListener("click", volverPaginaServicios);
}
//funcion del evento que permite regresar de la pagina servicios a la pagina productos
function volverPaginaProductos(){
    enlaceServicios.style.display = "block";
    imgCarritoProductos.style.display = "block";
    imgCarritoServicios.style.display = "none";
    enlaceProductos.style.display = "none";
    templateServicios.remove();
    main.appendChild(templateIndex);
}
//FUNCION DEL EVENTO QUE PERMITE REGRESAR DE LA PAGINA CARRITO SERVICIOS A LA PAGINA DE AGENDA SERVICIOS
function volverPaginaServicios(){
    templateCarritoServicios.remove();
    main.appendChild(templateServicios);
}
//FUNCION QUE ELIMINA LOS SERVICIOS AGENDADOS EN EL CARRITO
function eliminarServicio(e){
    agendaServiciosGuardada = (JSON.parse(localStorage.getItem("agendaServicios")));
    usuarioActual = (JSON.parse(sessionStorage.getItem("usuario")));
    //recorremos la agendaguardada en el localstorage y remplazamos en la posicion del servicio a eliminar el objeto servicio eliminado
    for (let [index,val] of agendaServiciosGuardada.entries()) {
        //buscar los elementos por usuarioactual en agenda
        if((val.nombre == usuarioActual.nombre) && (val.telefono == usuarioActual.telefono) && (val.id == e.target.id)){
            let servicioEliminado = {titulo:"SERVICIO ELIMINADO POR EL USUARIO"};
            agendaServiciosGuardada.splice(index,1,servicioEliminado)
        }
    }
    //subir a la agenda los servicios que quedan
    localStorage.setItem("agendaServicios",JSON.stringify(agendaServiciosGuardada));
    //remplazamos el nodo eliminado por el texto servicio eliminado
    for (let i = 0; i < carritoInnerServicios.childNodes.length; i++){
        while(carritoInnerServicios.childNodes[i] === e.target.offsetParent){
            carritoInnerServicios.childNodes[i].innerText = "SERVICIO ELIMINADO";
            break;
        }
    }
}
//funcion que guarda la compra de los servicios del usuario
function carritoAgendarServicios(){
    let agendaServiciosFinal = JSON.parse(localStorage.getItem("agendaServicios")) || [];
    usuarioActual = (JSON.parse(sessionStorage.getItem("usuario")));
    let serviciosAgendadosFinal = [];
    for (const iterator of agendaServiciosFinal) {
        let agendaObj = Object.assign({},usuarioActual,iterator);
        serviciosAgendadosFinal.push(agendaObj);
    }
    localStorage.setItem("comprasServicioRealizadas",JSON.stringify(serviciosAgendadosFinal));
    localStorage.setItem("agendaServicios",JSON.stringify([]));
    volverPaginaServicios();
}