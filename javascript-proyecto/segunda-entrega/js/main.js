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

const servicios = [{titulo:"Limieza Facial",des:"Procedimiento que elimina todas las impurezas que se encuentran en la piel generadas por el mismo cuerpo y por el ambiente.",precio:300,horaTrata:1,img:"./images/productos/limpiezaFacial.png",id:1},{titulo:"Maniqura",des:" Tratamiento de belleza cosmético para las uñas y manos",precio:600,horaTrata:2,img:"./images/productos/maniqura.png",id:2},{titulo:"Pediqura",des:"Tratamiento de belleza cosmético para las uñas y pies.",precio:600,horaTrata:2,img:"./images/productos/pediqura.png",id:3}];
const productos =[{titulo:"AGUA MICELAR",id:1,precio:300,tipoDePiel:"NORMAL",cant:10,img:"./images/productos/aguaMicelar.png"},{titulo:"JABON FACIAL",id:2,precio:120,tipoDePiel:"NORMAL",cant:10,img:"./images/productos/jabonFacial.png"},{titulo:"ESPUMA DESMAQUILLANTE",id:3,precio:450,tipoDePiel:"MIXTA",cant:10,img:"./images/productos/espumaDesmaquillante.png"},{titulo:"TONICO HIDRATANTE",id:4,precio:210,tipoDePiel:"SECA",cant:10,img:"./images/productos/tonicoHidratante.png"},{titulo:"TONICO REVITALIZANTE",id:5,precio:210,tipoDePiel:"GRASA",cant:10,img:"./images/productos/tonicoRevitalizante.png"}];
//subida al localStorage de servicios y productos
localStorage.setItem("servicios",JSON.stringify(servicios));
localStorage.setItem("productos",JSON.stringify(productos))

const carritoCompra = [];

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
let imgCarrito = header.querySelector("i");
imgCarrito.addEventListener("click",verCarrito);
//ELEMENTOS QUE SE MUESTRAN SI EL CARRITO ESTA VACIO
let agregar = document.createElement("h2");
let regreso = document.createElement("button");
regreso.innerHTML = "<button class=btn btn-primary entrar mb-1 btn-lg type=button>REGRESAR</button>";
agregar.innerHTML = "<h2>NO TIENES PRODUCTOS NI SERVICIOS EN TU CARRITO</h2>";
//CAPTURA DE ICONO QUE MUESTRA UN EVENTO QUE LLEVA CARRITO DE COMPRA
let paginaCarrito = document.querySelector("#paginaCarrito");
let templateCarrito = paginaCarrito.content.querySelector(".wrapper");
let carritoInner = templateCarrito.querySelector(".carrito");
let cardCarritoInnerIndex = carritoInner.querySelector(".cardCarrito");
cardCarritoInnerIndex.remove();
carritoInner.style.background = "none";
//CAPTURA DE LA CARD QUE MUESTRA LOS PRODUCTOS
let productosInner = templateIndex.querySelector(".productos");
productosInner.style.background = "none";
let cardProductosInnerIndex = productosInner.querySelector(".cardProductos");
cardProductosInnerIndex.remove();
//CAPTURA DE LA CARD QUE MUESTRA LOS SERVICIOS
let serviciosInner = templateIndex.querySelector(".servicios");
serviciosInner.style.background = "none";
let cardServiciosInnerIndex = serviciosInner.querySelector(".cardServicios");
cardServiciosInnerIndex.remove();

//FUNCION QUE MUESTRA EL CARRITO DE PRODUCTOS
function verCarrito(e){
    agregar.remove();
    regreso.remove();
    templateIndex.remove();
    main.appendChild(templateCarrito);

    let totalCompra = 0;
    if(!localStorage.getItem("carritoCompra")){
        templateCarrito.appendChild(agregar);
        templateCarrito.appendChild(regreso);
        regreso.addEventListener("click",regresoIndex(regreso,agregar,carritoCompra));
    } else{
        carritoCompraGuardada = JSON.parse(localStorage.getItem("carritoCompra"));
        if(carritoCompraGuardada.length !== 0){
            carritoCompraGuardada.forEach(element => {
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
    //eliminamos del localstorage el producto
    carritoCompraGuardada = JSON.parse(localStorage.getItem("carritoCompra"));
    localStorage.setItem("carritoCompra",JSON.stringify([]));
    //let compraProductoEliminado = {titulo:"COMPRA ELIMINADA",precio:0};
    for (let [index,valor] of carritoCompraGuardada.entries()) {
        while ((valor.id == e.target.id)) {
            carritoCompraGuardada.splice(index,1);
            break;
        }
    }
    
    //eliminamos del dom el producto
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
    verCarrito();
}
//MOSTRAR POR CADA PRODUCTO UNA CARD CON SUS ESPESIFICACIONES
let productosGuardados = JSON.parse(localStorage.getItem("productos"));
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
//POR CADA SERVICIO MUESTRE UNA CARD CON LAS ESPESIFICACIONES
let serviciosGuardados = JSON.parse(localStorage.getItem("servicios"));
serviciosGuardados.forEach(element => {
    let cardServiciosInnerIndexClonada = cardServiciosInnerIndex.cloneNode(true);
    let parrfCardServiciosInnerClonada = cardServiciosInnerIndexClonada.querySelector("p");
    let imgCardServiciosInnerClonada = cardServiciosInnerIndexClonada.querySelector("img");
    imgCardServiciosInnerClonada.setAttribute("src",`${element.img}`);
    parrfCardServiciosInnerClonada.textContent = `${element.titulo}\n\nDESCRIPCION: ${element.des}\nHORA DE TRATAMIENTO: ${element.horaTrata} HORAS`;
    serviciosInner.appendChild(cardServiciosInnerIndexClonada);
});
//funcion que agrega al carrito los productos que quiere comprar
function agregarProductos(e){
    let posibleCompra = productosGuardados.find(prod => prod.id == e.target.id);
    if(!localStorage.getItem("carritoCompra")){
        carritoCompra.push(posibleCompra);
        localStorage.setItem("carritoCompra",JSON.stringify(carritoCompra));
    }else{
        let posibleCompraGuardada = JSON.parse(localStorage.getItem("carritoCompra"));
        localStorage.setItem("carritoCompra",JSON.stringify([]));
        posibleCompraGuardada.push(posibleCompra);
        localStorage.setItem("carritoCompra",JSON.stringify(posibleCompraGuardada));
    }
    
}

