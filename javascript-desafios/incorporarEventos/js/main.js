//INCORPORAR EVENTOS
//PASOS A SEGUIR EN EL PROYECTO MIABONITA ESTETICA

//1.- DEBE ESCOGER ENTRE LOS DIFERENTES SERVICIOS O PRODUCTOS
//2.- SI ES SERVICIOS ESCOGER: A.- EL SERVICIO B.- LA FECHA Y HORA
//3.- SI ES PRODUCTOS ESCOGER: C.- EL PRODUCTO D.- LA CANTIDAD
//4.- SUMAMOS SERVICIO + PRODUCTOS: E.- LA FORMA DE PAGO F.- RESUMEN DE COMPRA EN FORMA DE CARRITO DE COMPRA.
//5.- EL USUARIO DEBE INGRESAR EN UNA CUENTA

//NECESITAMOS LAS SIGUIENTES VARIABLES y OBJETOS
//1.- USUARIOS
//2.- SERVICIOS
//3.- PRODUCTOS
//4.- CARRITO
//5.- CONFIGURACION USUARIO


const administradores = [{superUsuario:"admin",password:"admin"}];
const clientes = [];
const servicios = [{titulo:"Limieza Facial",des:"Procedimiento que elimina todas las impurezas que se encuentran en la piel generadas por el mismo cuerpo y por el ambiente.",precio:300,horaTrata:1,img:"./images/productos/limpiezaFacial.png",id:1},{titulo:"Maniqura",des:" Tratamiento de belleza cosmético para las uñas y manos",precio:600,horaTrata:2,img:"./images/productos/maniqura.png",id:2},{titulo:"Pediqura",des:"Tratamiento de belleza cosmético para las uñas y pies.",precio:600,horaTrata:2,img:"./images/productos/pediqura.png",id:3}];
const productos =[{titulo:"AGUA MICELAR",id:1,precio:300,tipoDePiel:"NORMAL",cant:10,img:"./images/productos/aguaMicelar.png"},{titulo:"JABON FACIAL",id:2,precio:120,tipoDePiel:"NORMAL",cant:10,img:"./images/productos/jabonFacial.png"},{titulo:"ESPUMA DESMAQUILLANTE",id:3,precio:450,tipoDePiel:"MIXTA",cant:10,img:"./images/productos/espumaDesmaquillante.png"},{titulo:"TONICO HIDRATANTE",id:4,precio:210,tipoDePiel:"SECA",cant:10,img:"./images/productos/tonicoHidratante.png"},{titulo:"TONICO REVITALIZANTE",id:5,precio:210,tipoDePiel:"GRASA",cant:10,img:"./images/productos/tonicoRevitalizante.png"}];
const horaDeTrabajo = [];
const agendaServicios = [];
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
let header = document.querySelector("header");
let imgCarrito = header.querySelector("i");
imgCarrito.addEventListener("click",verCarrito);

let agregar = document.createElement("h2");
let regreso = document.createElement("button");
regreso.innerHTML = "<button class=btn btn-primary entrar mb-1 btn-lg type=button>REGRESAR</button>";
agregar.innerHTML = "<h2>NO TIENES PRODUCTOS NI SERVICIOS EN TU CARRITO</h2>";

let paginaCarrito = document.querySelector("#paginaCarrito");
let templateCarrito = paginaCarrito.content.querySelector(".wrapper");
let carritoInner = templateCarrito.querySelector(".carrito");
carritoInner.style.background = "none";

function verCarrito(e){
    agregar.remove();
    regreso.remove();
    templateIndex.remove();
    main.appendChild(templateCarrito);
    let cardCarritoInnerIndex = carritoInner.querySelector(".cardCarrito");
    cardCarritoInnerIndex.remove();
    let totalCompra = 0;
    if(carritoCompra.length !== 0){
        carritoCompra.forEach(element => {
            let cardCarritoInnerIndexClonada = cardCarritoInnerIndex.cloneNode(true);
            let imgCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("img");
            imgCardCarritoInnerIndexClonada.setAttribute("src",`${element.img}`);
            let parrfCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("p");
            parrfCardCarritoInnerIndexClonada.textContent = `Para Piel: ${element.tipoDePiel}\tPrecio: ${element.precio}$`;
            let labelCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("label");
            labelCardCarritoInnerIndexClonada.textContent = `${element.titulo}`;
            let inputCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("input");
            inputCardCarritoInnerIndexClonada.setAttribute("max",`${element.cant}`);
            inputCardCarritoInnerIndexClonada.setAttribute("disabled",true);
            totalCompra = totalCompra + (element.precio * 1);
            let buttonCardCarritoInnerIndexClonada = cardCarritoInnerIndexClonada.querySelector("button");
            buttonCardCarritoInnerIndexClonada.addEventListener("click", eliminarProducto);
            buttonCardCarritoInnerIndexClonada.setAttribute("id",`${element.id}`);
            carritoInner.appendChild(cardCarritoInnerIndexClonada);
        });
        let spanCarritoInnerIndex = carritoInner.querySelector("span");
        spanCarritoInnerIndex.textContent = `TOTAL DE COMPRA: ${totalCompra}`;

    }else{
        templateCarrito.appendChild(agregar);
        templateCarrito.appendChild(regreso);
        regreso.addEventListener("click",regresoIndex(regreso,agregar,carritoCompra));
    }
}
//FUNCION DE REGRESO AL INDEX
function regresoIndex(regreso,agregar,carritoCompra){
    regreso.remove();
    agregar.remove();
    carritoCompra = [];
    location.reload(true);
}
//funcion que elimina productos del carrito de compra
function eliminarProducto(e){
    let eliminarProducto = carritoCompra.indexOf(e.target.id);
    carritoCompra.splice(eliminarProducto,1);
    let productoClick = e.target;
    productoClick.parentElement.remove();
    verCarrito();
}

let paginaIndex = document.querySelector("#paginaIndex");
let templateIndex = paginaIndex.content.querySelector(".wrapper");
main.appendChild(templateIndex);

let productosInner = templateIndex.querySelector(".productos");
productosInner.style.background = "none";
let cardProductosInnerIndex = productosInner.querySelector(".cardProductos");
cardProductosInnerIndex.remove();

//MOSTRAR POR CADA PRODUCTO UNA CARD CON SUS ESPESIFICACIONES
productos.forEach(element => {
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

let serviciosInner = templateIndex.querySelector(".servicios");
serviciosInner.style.background = "none";
let cardServiciosInnerIndex = serviciosInner.querySelector(".cardServicios");
cardServiciosInnerIndex.remove();
//POR CADA SERVICIO MUESTRE UNA CARD CON LAS ESPESIFICACIONES
servicios.forEach(element => {
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
//funcion que agrega al carrito los productos que quiere comprar
function agregarProductos(e){
    let posibleCompra = productos.find(prod => prod.id == e.target.id);
    carritoCompra.push(posibleCompra);
}
//funcion que agrega a la agenda los servicios que quiere agendar
function agregarServicios(e){
    let agendaCliente = servicios.find( serv => serv.id == e.target.id);
    agendaServicios.push(agendaCliente);
}
