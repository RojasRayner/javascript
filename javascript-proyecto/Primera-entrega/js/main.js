//SE DEBE ENTREGAR, LO SIGUIENTE
//Estructura HTML del PROYECTO
//Variables de JS necesarias
//Objeto de JS
//Arrays
//Metodos de busqueda y filtrado sobre el Array

//PASOS A SEGUIR EN EL PROYECTO MIABONITA ESTETICA
//1.- EL USUARIO DEBE INGRESAR EN UNA CUENTA
//2.- DEBE ESCOGER ENTRE LOS DIFERENTES SERVICIOS O PRODUCTOS
//3.- SI ES SERVICIOS ESCOGER: A.- EL SERVICIO B.- LA FECHA Y HORA
//4.- SI ES PRODUCTOS ESCOGER: C.- EL PRODUCTO D.- LA CANTIDAD
//5.- SUMAMOS SERVICIO + PRODUCTOS: E.- LA FORMA DE PAGO F.- RESUMEN DE COMPRA EN FORMA DE CARRITO DE COMPRA.

//NECESITAMOS LAS SIGUIENTES VARIABLES y OBJETOS
//1.- USUARIOS
//2.- SERVICIOS
//3.- PRODUCTOS
//4.- CARRITO
//5.- CONFIGURACION USUARIO


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
//inicio del programa
bienvenida();
function bienvenida() {
    opcion = confirm("CENTRO ESTETICO MIA BONITA\nDESEA INGRESAR");
    if (opcion == true) {
        comienzo();
    } else {
        salir();
    }
}
//salir de la funcion
function salir(){
    alert("SALUDOS CIERRA EL NAVEGADOR");
}
//funcion de validacion datos del usuario no vacios
function comienzo(){
    let nombreUsuario = prompt("INGRESE SU NOMBRE");
    let passUsuario = prompt("INGRESE SU CONTRASEÑA");
    if((nombreUsuario !== "") && (passUsuario !== "")){
        loguin(nombreUsuario,passUsuario);
    }else{
        alert("PorFavor Introduzca Datos Correctos");
        comienzo();
    }
}
//funcion de busqueda de usuario si esta registrado pasar al siguiente nivel, de lo contrario registrar
function loguin(nombreUsuario,passUsuario) {
    for (const administrador of administradores) {
        if((nombreUsuario == administrador.superUsuario) && (passUsuario == administrador.password)){
            alert(`BIENVENIDO ADMINISTRDOR ${administrador.superUsuario}`);
        }else{
            if(clientes.length === 0){
                telUsuario = Number(prompt("INGRESE NUMERO DE TELEFONO"));
                validacionTelefono(telUsuario,nombreUsuario,passUsuario);
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }else{
                for (const cliente of clientes) {
                    if((nombreUsuario == cliente.nombre) && (passUsuario == cliente.pass)){
                        telUsuario = cliente.tel;
                        menuCliente(nombreUsuario,passUsuario,telUsuario);
                    }else {
                        opcion = confirm("Gracias por escojer a MIA BONITA\nTu Centro de Estetica\n\tDESEAMOS CONOCERTE\n\tPARA ESO TE PEDIREMOS ALGUNOS DATOS.");
                        if(opcion == false){
                            comienzo();
                        }else{
                            telUsuario = Number(prompt("INGRESE NUMERO DE TELEFONO"));
                            validacionTelefono(telUsuario);
                            nuevoCliente(nombreUsuario,passUsuario,telUsuario);
                        }
                    }
                }
            }
        }
    }
}
//funcion para validar numero de telefono
function validacionTelefono(telUsuario,nombreUsuario,passUsuario) {
    val = telUsuario;
    val1 = val.toString();
    if(((isNaN(telUsuario)) === true) || (telUsuario === 0) || ((val1.length) == 8)){
        alert("INGRESE UN NUMERO DE TELEFONO VALIDO.\n\tRECUERDE SON 8 DIGITOS")
        loguin(nombreUsuario,passUsuario);
    }else{
        alert(`Numero: ${telUsuario} Ingresado Correctamente.`);
        return telUsuario;
    }
}
//funcion para agregar nuevo cliente
function nuevoCliente(nombreUsuario,passUsuario,telUsuario) {
    opcion = Number(prompt(`PorFavor, Deseas Continuar como: ${nombreUsuario}.\nCon esta Contraseña: ${passUsuario}.\nCon este Numero de Telefono: ${telUsuario}\n\tELIGE:\n\t1.-CAMBIAR NOMBRE.\n\t2.-CAMBIAR CONTRASEÑA.\n\t3.-CAMBIAR NUMERO DE TELEFONO\n\t4.-MANTENER Y CONTINUAR.\n\t5.-SALIR.`));
    switch (opcion) {
        case 1:
            nuevoNombre = prompt(`\tEl nombre anterior era: ${nombreUsuario}.\n\n\n\tTu Nuevo Nombre Sera: `);
            if((typeof nuevoNombre !== 'undefined') && (typeof nuevoNombre !== null) && (nuevoNombre !== "")){
                nombreUsuario = nuevoNombre;
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }else{
                alert("PorFavor Ingresa un Nombre Valido");
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }
        case 2:
            nuevoPass = prompt(`\tLa Contraseña anterior era: ${passUsuario}.\n\n\n\tTu Nueva Contraseña Sera: `);
            if((typeof nuevoPass !== 'undefined') && (typeof nuevoPass !== null) && (nuevoPass !== "")){
                passUsuario = nuevoPass;
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }else{
                alert("PorFavor Ingresa un Nombre Valido");
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }
        case 3:
            nuevoTel = Number(prompt(`\tTu Numero de Telefono anterior era: ${telUsuario}.\n\n\n\tTu Nuevo Numero de Telefono Sera: `));
            val = nuevoTel;
            val1 = val.toString();
            val2 = val1.length;
            if((typeof nuevoTel !== "undefined") && (typeof nuevoTel !== null) && ((isNaN(nuevoTel)) == false) && (nuevoTel !== 0) && (val2 == 8)){
                telUsuario = nuevoTel;
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }else{
                alert("PorFavor Ingresa un Numero de Telefono Valido\n\tRECUERDE SON 8 DIGITOS");
                nuevoCliente(nombreUsuario,passUsuario,telUsuario);
            }
        case 4:
            alert(`Gracias ${nombreUsuario} Por Elegirnos.`);
            clientes.push({nombre:nombreUsuario,tel:telUsuario,pass:passUsuario});
            menuCliente(nombreUsuario,passUsuario,telUsuario);    
        case 5:
            alert(`Gracias Por Visitarnos.`);
            bienvenida();       
        default:
            alert("POR FAVOR INGRESE UNA OPCION CORRECTA.");
            nuevoCliente(nombreUsuario,passUsuario,telUsuario);
    }
}
//funcion que muestra el menu principal del Centro Estetico MIA BONITA
function menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra) {
    opcion = Number(prompt(`${nombreUsuario.toUpperCase()}\nIngrese una opcion:\n\n\t1.-BUSCO SERVICIOS\n\t2.-BUSCO PRODUCTOS\n\t3.-VER CARRITO DE COMPRA\n\t4.-CONFIGURACION\n\t5.-SALIR`));
    switch (opcion) {
        case 1:
            servicioCliente(nombreUsuario,telUsuario,passUsuario);
        case 2:
            productoCliente(nombreUsuario,passUsuario,telUsuario);
        case 3:
            carritoCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        case 4:
            configuracionCliente(nombreUsuario,passUsuario,telUsuario);
        case 5: 
            bienvenida();
        default:
            alert("POR FAVOR INGRESE UNA OPCION CORRECTA.");
            menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
    }
}
//funcion que muestra los servicios que se ofrecen en el Centro Estetico MIA BONITA
function servicioCliente(nombreUsuario,telUsuario,passUsuario) {
    alert(`${nombreUsuario.toUpperCase()}\nLE PODEMOS OFRECER LOS SIGUIENTES SERVICIOS.`);
    for (const servicio of servicios) {
        opcion = confirm(`AGENDE EL SERVICIO DE: ${servicio.titulo}.\n\tACEPTAR PARA AGENDAR ESTE SERVICIO\n\tCANCELAR PARA VER OTROS SERVICIOS.`);
        if(opcion == true){
            opcion1 = prompt("ELIGA UN DIA:\n\tLUNES\n\tMARTES\n\tMIERCOLES\n\tJUEVES\n\tVIERNES");
            opcion1 = opcion1.toUpperCase();
            if((opcion1 != "LUNES") && (opcion1 != "MARTES") && (opcion1 != "MIERCOLES") && (opcion1 != "JUEVES") && (opcion1 != "VIERNES")){
                alert("INGRESE UN DIA CORRECTO.");
                servicioCliente(nombreUsuario,telUsuario);
            }else{
                opcion2 = confirm(`SEGURO QUE DESEA EL SERVICIO:${servicio.titulo}.El DIA:${opcion1}.`)
                if(opcion2 == true){
                    servicioUsuario = servicio.titulo;
                    opcion3 = prompt("ELIGA UNA HORA, PUEDE SER:\n\t9\n\t10\n\t11\n\t12\n\t13\n\t14\n\t15\n\t16\n\t17\n\t18\n\t19");
                    if((opcion3 != "9") && (opcion3 != "10") && (opcion3 != "11") && (opcion3 != "12") && (opcion3 != "13") && (opcion3 != "14") && (opcion3 != "15") && (opcion3 != "16") && (opcion3 != "17") && (opcion3 != "18") && (opcion3 != "19")){
                        alert("INGRESE UNA HORA CORRECTA")
                        servicioCliente(nombreUsuario,telUsuario,passUsuario);
                    }else{
                        hora = Number(opcion3);
                        fecha = opcion1;
                        horaTrata = servicio.horaTrata;
                        const fechaServicio = [new FechaServicios(fecha,hora,servicioUsuario,horaTrata,nombreUsuario,telUsuario,passUsuario)];
                        console.log("fechaSericio" + fechaServicio);
                        disponible(hora,fecha,horaTrata,nombreUsuario,telUsuario,passUsuario,servicioUsuario,horaDeTrabajo,fechaServicio,passUsuario);
                        let indexTrabajo = fechaServicio.find(i => i.telefono == telUsuario);
                        alert(`TODO AGENDADO\nSERA EL DIA ${indexTrabajo.fecha}\nHORA ${indexTrabajo.hora}.\nSERVICIO ${indexTrabajo.serviCliente}.\nDURACION APROX: ${indexTrabajo.horaTrata}`);
                        menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
                    }
                }
            }
        }else{
            continue;
        }
    }
}
//FUNCION QUE MUESTRA DE HORA PARA EL SERVICIO
function disponible(hora,fecha,horaTrata,nombreUsuario,telUsuario,passUsuario,servicioUsuario,horaDeTrabajo,fechaServicio,passUsuario){
    if((typeof horaDeTrabajo !== 'undefined') && (horaDeTrabajo.length !== 0)){
        let horaTrabajo = horaDeTrabajo.find(trabajo => trabajo.hora == hora )
        let fechaTrabajo = fechaServicio.find(elementUno => elementUno.telefono == telUsuario);
        if((fechaTrabajo.hora !== horaTrabajo.hora) && (fechaTrabajo.fecha !== horaTrabajo.fecha) && (fechaTrabajo.horaTrata !== horaTrabajo.horaTrata) &&(fechaTrabajo.password !== horaTrabajo.password)){
            horaTrabajo.hora = hora;
            horaTrabajo.fecha = fecha;
            horaTrabajo.horaTrata = horaTrata;
            horaTrabajo.cliente = nombreUsuario;
            horaTrabajo.telefono = telUsuario;
            horaTrabajo.password = passUsuario;
            horaTrabajo.tituloServicio = servicioUsuario;
            horaDeTrabajo.push(horaTrabajo);
            console.log("horaTrabajo" + horaDeTrabajo);
            alert("SERVICIO AGENDADO");
        }else{
            alert("YA TIENES AGENDADA UNA CITA A ESTA HORA");
            menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        }
    }else{
            horaDeTrabajo.hora = hora;
            horaDeTrabajo.fecha = fecha;
            horaDeTrabajo.horaTrata = horaTrata;
            horaDeTrabajo.cliente = nombreUsuario;
            horaDeTrabajo.telefono = telUsuario;
            horaDeTrabajo.password = passUsuario;
            horaDeTrabajo.tituloServicio = servicioUsuario;
            horaDeTrabajo.push(horaDeTrabajo);
            console.log("horaTrabajo" + horaDeTrabajo);
            alert("SERVICIO AGENDADO");
    }
}
//funcion que muestra los productos que ofrece centro estetico MIA BONITA
function productoCliente(nombreUsuario,passUsuario,telUsuario){
    alert(`${nombreUsuario.toUpperCase()}\nLE PODEMOS OFRECER LOS SIGUIENTES PRODUCTOS EN BASE A SU TIPO DE PIEL.`);
    tipoPiel = prompt("INDIQUE SU TIPO DE PIEL:\n\tNORMAL\n\tSECA\n\tGRASA\n\tMIXTA\n\tSALIR");
    tipoPiel = tipoPiel.toUpperCase();
    if((tipoPiel != "NORMAL") && (tipoPiel != "SECA") && (tipoPiel != "GRASA") && (tipoPiel != "MIXTA") && (tipoPiel != "SALIR")){
        alert("INGRESE UN TIPO DE PIEL CORRECTA")
        productoCliente(nombreUsuario,passUsuario,telUsuario);
    }else if(tipoPiel == "SALIR"){
        menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
    }else{
        subirCompra(nombreUsuario,passUsuario,telUsuario,tipoPiel);
        menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
    }
}
//funcion que agrega la compra al carrito
function subirCompra(nombreUsuario,passUsuario,telUsuario,tipoPiel) {
    let filtro = productos.filter(elemento => elemento.tipoDePiel == tipoPiel);
    const titulo = filtro.map(ele => "ID\t" + ele.id +"\t"+ ele.titulo + "\tCANT\t"+ ele.cant);
    const mostrarfiltro = titulo.join('\n');
    let venta = Number(prompt(`ESTOS SON LOS PRODUCTOS PARA TU TIPO DE PIEL:\n${mostrarfiltro}\n\nESCOJA SOLO UN PRODUCTO A LA VEZ.\nINGRESE SOLO EL ID.`));
    const filtro1 = filtro.filter(elementUno  => elementUno.id == venta);
    const tituloUno = filtro1.map(eleUno => "PRODUCTO:\t" + eleUno.titulo + "\tEN ALMACEN TENEMOS LA CANTIDAD DE\t" + eleUno.cant);
    let ventaCant = Number(prompt(tituloUno + "\n\n\tINGRESE CANTIDAD A COMPRAR."));
    let productoCompra = productos.find(produ => produ.id === venta);
    productoCompra.cantidad = ventaCant;
    productoCompra.total = productoCompra.precio * ventaCant;
    productoCompra.usuario = nombreUsuario;
    productoCompra.password = passUsuario;
    productoCompra.telefono = telUsuario;
        if((productoCompra.cant < ventaCant) || (ventaCant == 0)){
            alert("CANTIDAD DE PRODUCTOS INVALIDA");
            productoCliente(nombreUsuario,passUsuario,telUsuario);
        }else{
            opcion = confirm(`${productoCompra.titulo}\tCANTIDAD: ${productoCompra.cantidad}\n\nDESEA ESTE PRODUCTO\n\tACEPTAR PARA CONTINUAR\n\tCANCELAR PARA VOLVER A OTROS PRODUCTOS`);
            if(opcion == false){
                productoCliente(nombreUsuario,passUsuario,telUsuario);
            }else{
                alert("SUS PRODUCTOS ESTAN EN EL CARRITO")
                carritoCompra.push(productoCompra);
                productoCliente(nombreUsuario,passUsuario,telUsuario);
            }
        }
}
//Menu para ver total de carrito y eliminar datos del carrito de compra
function carritoCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra){
    opcion = Number(prompt("1.-VER CARRITO\n2.-ELIMINAR CARRITO\n3.-SALIR"));
    switch (opcion) {
        case 1:
            verCarrito(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        case 2:
            eliminarCarrito(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        case 3:
            menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        default:
            alert("INGRESE UNA OPCION CORRECTA");
            carritoCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        }
}
//ver Total del carrito
function totalCarrito(carritoCompra){
    let monto = 0;
    carritoCompra.forEach(element => {
        monto = monto + element.total;
    });
    return monto;
}
//Completar La Compra 
function verCarrito(nombreUsuario,passUsuario,telUsuario,carritoCompra){
    if((typeof carritoCompra !== 'undefined') && (carritoCompra.length != 0)){
        let filtroDos = carritoCompra.filter(elemento => elemento.password == passUsuario);
        const comprasUsuario = filtroDos.map(ele => "ID\t" + ele.id +"\t"+ ele.titulo + "\tCANT\t"+ ele.cant + "\tSubTotal\t" + ele.total);
        const mostrarComprasUsuario = comprasUsuario.join('\n');
        let ventaFinal = confirm(`ESTA ES TU COMPRA:\n${mostrarComprasUsuario}\n\nTOTAL: ${totalCarrito(carritoCompra)}\n\nACEPTAR PARA CONFIRMAR.\nCANCELAR PARA AGREGAR MAS PRODUCTOS.`);
        if(ventaFinal == false){
            menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        }else{
            alert("TU COMPRA SE HA REALIZADO");
            menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
        }
    }else{
        alert("NO HAY PRODUCTOS EN SU CARRITO.");
        menuCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
    }
}
//eliminar productos del Carrito
function eliminarCarrito(nombreUsuario,passUsuario,telUsuario,carritoCompra){
    if(carritoCompra.length != 0){  
        let filtroTres = carritoCompra.filter(elemento => elemento.password == passUsuario);
        const comprasEliminar = filtroTres.map(ele => "ID\t" + ele.id +"\t"+ ele.titulo + "\tCANT\t"+ ele.cant + "\tSubTotal\t" + ele.total);
        const mostrarComprasEliminar = comprasEliminar.join('\n');
        let eliminar = Number(prompt(`ESTA ES TU COMPRA:\n${mostrarComprasEliminar}\n\nTOTAL: ${totalCarrito(carritoCompra)}\n\nPARA ELIMINAR INTRODUZCA EL ID DEL PRODUCTO.\nPARA REGRESAR AL MENU ANTERIOR INTRODUZCA `));
        let productoEliminar = carritoCompra.find(productoCarrito => productoCarrito.id == eliminar);
        let index = carritoCompra.indexOf(productoEliminar);
        carritoCompra.splice(index,1);
        alert("PRODUCTO ELIMINADO DEL CARRITO");
    }else{
        alert("NO HAY PRODUCTOS EN EL CARRITO.");
        carritoCliente(nombreUsuario,passUsuario,telUsuario,carritoCompra);
    }
}
//