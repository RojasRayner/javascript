/* SIMULADOR INERACTIVO
INCORPORAR LO EJERCITADO EN LAS CLASES ANTERIORES
1.- ALGORITMO CONDICIONAL
2.- ALGORITMO CON CICLO
3.- UTILIZAR FUNCIONES PARA REALIZAR ESAS OPERACIONES
*///PASOS A DAR EN ESTE PROGRAMA 
//A.- DAR BIENVENIDA
//B.- INGRESAR NOMBRE Y NUMERO DE TELEFONO
//C.- SERVICIOS A OFRECER
//D.- PRODUCTOS A OFRECER
//E.- RESUMEN DE OFRECIMIENTO ACEPTADO
//F.- RETORNO A BIENVENIDA
const saludo = "Bienvenido/a a Centro Estetico MiaBonita";
const ingreso = "Genial Empezemos";
const despedida = "Queremos que vuelvas";
let nombreCliente;
let telefonoCliente;
let dia;
let seguro;
let cliente2;
const clientes = {
    nombre: "rayner",
    telefono: 123,
}
const producto1 = {
    nombre: "Jabon Facial",
    cantidadExistencia: 10,
}
const producto2 = {
    nombre: "Agua Micelar",
    cantidadExistencia: 10,
}
const producto3 = {
    nombre: "Espuma Desmaquillante",
    cantidadExistencia: 10,
}
let tipoCliente;
//ingresa los datos del cliente en el objeto clientes
function IngresoClientesNuevos(nombreCliente,telefonoCliente){
        this.nombre = nombreCliente;
        this.telefono = telefonoCliente;
}
//busca si los clientes ya estaban registrados
//Si lo estaban pasar a ofrecer servicios y productos.
//de lo contrario pasar a agregarlos al objeto clientes y ofrecer servicios y productos
function buscarClientes(nombreCliente,telefonoCliente){
    console.log(`El cliente resgistrado es ${clientes.nombre}\n su numero de telefono es ${clientes.telefono}`);
    if ((clientes.nombre === nombreCliente) && (nombreCliente !== "") && (nombreCliente !== null) && (telefonoCliente !== " ")){
        const opciones = Number(prompt(`Bienvenido/a ${nombreCliente}.\n Te estabamos esperando\n Porfavor elige entre las Opciones.\n1.- Servicio\n2.- Productos\n3.- Salir a Inicio`));
        tipoCliente = 1;
        console.log(clientes);
        opcionesPermitidas(opciones);        
    }else if((clientes.nombre !== nombreCliente) && (nombreCliente !== "") && (nombreCliente !== null) && (telefonoCliente !== " ")){
        cliente2 = new IngresoClientesNuevos(nombreCliente, telefonoCliente);
        tipoCliente = 2;
        console.log(cliente2);
        const opciones = Number(prompt(`${nombreCliente}, Te agradezemos la confianza en nuestros servicios.\n Porfavor elige entre las opciones.\n1.- Servicio\n2.- Productos\n3.-Salir a inicio`));
        opcionesPermitidas(opciones);
    }else{
        alert(`Debe ingresar un nombre y un numero de telefono Validos.`);
        bienvenida();
    }
}
//condicional que da a las opciones elegidas por el cliente el siguiente paso a seguir en el simulador
function opcionesPermitidas(opciones){
    switch (opciones) {
        case 1:
            serviciosOfrecer(nombreCliente,telefonoCliente);
        case 2:
            productosOfrecer();
        case 3:
            bienvenida();
        default:
            alert("Porfavor eligue solo entre las opciones permitidas");
            buscarClientes(nombreCliente,telefonoCliente);
    }
}
//servicios a ofrecer
function serviciosOfrecer(nombreCliente,telefonoCliente){
    let servicio = Number(prompt(`Que servicio desea adquirir\n1.- Limpieza Facial\n2.- Maniqura\n3.-Pediqura\n4.- Salir`));
    switch (servicio) {
        case 1:
            servicio = "Limpieza Facial";
            fechaServicio(nombreCliente,telefonoCliente,servicio);
        case 2:
            servicio = "Maniqura";
            fechaServicio(nombreCliente,telefonoCliente,servicio);
        case 3:
            servicio = "Pediqura";
            fechaServicio(nombreCliente,telefonoCliente,servicio);
        case 4:
            buscarClientes(nombreCliente,telefonoCliente);
        default:
            alert("Porfavor eligue solo entre las opciones permitidas");
            serviciosOfrecer();
    }
}
//Productos que se ofrecen
function productosOfrecer(){
    const productos = Number(prompt(`Que producto desea adquirir\n1.- Jabones Facial\n2.- Agua Micelar\n3.- Espuma Desmaquillante\n4.- Salir`));
    switch (productos) {
        case 1:
            if(confirm(`Tenemos la cantidad de: ${producto1.cantidadExistencia}.`)){
                cantidad = prompt("Cuanta Catidad desea adquirir:");
                if((cantidad <= producto1.cantidadExistencia) && (cantidad >= 1)){
                    producto1.cantidadExistencia = producto1.cantidadExistencia - cantidad;
                    alert(`Adquiriste la cantidad de: ${cantidad}.\nProductos de: ${producto1.nombre}\nLa cantidad de producto restante es ${producto1.cantidadExistencia}`);
                    productosOfrecer();
                }else{
                    alert("Cantidad no permitida");
                    productosOfrecer();
                }
            }else{
                productosOfrecer();
            } 
        case 2:
            if(confirm(`Tenemos la cantidad de: ${producto2.cantidadExistencia}.`)){
                cantidad = prompt("Cuanta Catidad desea adquirir:");
                if((cantidad <= producto2.cantidadExistencia) && (cantidad >= 1)){
                    producto2.cantidadExistencia = producto2.cantidadExistencia - cantidad;
                    alert(`Adquiriste la cantidad de: ${cantidad}.\nProductos de: ${producto2.nombre}\nLa cantidad de producto restante es ${producto2.cantidadExistencia}`);
                    productosOfrecer();
                }else{
                    alert("Cantidad no permitida");
                    productosOfrecer();
                }
            }else{
                productosOfrecer();
            } 
        case 3:
            if(confirm(`Tenemos la cantidad de: ${producto3.cantidadExistencia}.`)){
                cantidad = prompt("Cuanta Catidad desea adquirir:");
                if((cantidad <= producto3.cantidadExistencia) && (cantidad >= 1)){
                    producto3.cantidadExistencia = producto3.cantidadExistencia - cantidad;
                    alert(`Adquiriste la cantidad de: ${cantidad}.\nProductos de: ${producto3.nombre}\nLa cantidad de producto restante es ${producto3.cantidadExistencia}`);
                    productosOfrecer();
                }else{
                    alert("Cantidad no permitida");
                    productosOfrecer();
                }
            }else{
                productosOfrecer();
            } 
        case 4:
            buscarClientes(nombreCliente,telefonoCliente);
        default:
            alert("Porfavor eligue solo entre las opciones permitidas");
            productosOfrecer();
    }
}
//fechas a escojer por el cliente
function fechaServicio(nombreCliente,telefonoCliente,servicio) {
    let fechas = Number(prompt("Ingrese dia de la semana que desea el sericio:\n1.-Lunes\n2.-Martes\n3.-Miercoles\n4.-Jueves\n5.-Viernes\n6.-Volver al Menu anterior"));
    seguro = (confirm("Esta seguro que desea esta opcion"));
        if(seguro == true){
            if(tipoCliente == 1){
                switch (fechas) {
                    case 1:
                        dia = "Lunes";
                        clientes.fechaServicio = "Lunes";
                        clientes.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${clientes.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${clientes.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 2:
                        dia = "Martes";
                        clientes.fechaServicio = "Martes";
                        clientes.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${clientes.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${clientes.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 3:
                        dia = "Miercoles";
                        clientes.fechaServicio = "Miercoles";
                        clientes.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${clientes.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${clientes.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 4:
                        dia = "Jueves";
                        clientes.fechaServicio = "Jueves";
                        clientes.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${clientes.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${clientes.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 5:
                        dia = "Viernes";
                        clientes.fechaServicio = "Viernes";
                        clientes.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${clientes.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${clientes.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 6:
                        serviciosOfrecer(nombreCliente,telefonoCliente);
                    default:
                        alert("Porfavor, Ingrese una opcion correcta.")
                        fechaServicio(nombreCliente,telefonoCliente,servicio);
                }    
            }else if(tipoCliente == 2){
                switch (fechas) {
                    case 1:
                        dia = "Lunes";
                        cliente2.fechaServicio = "Lunes";
                        cliente2.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${cliente2.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${cliente2.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 2:
                        dia = "Martes";
                        cliente2.fechaServicio = "Martes";
                        cliente2.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${cliente2.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${cliente2.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 3:
                        dia = "Miercoles";
                        cliente2.fechaServicio = "Miercoles";
                        cliente2.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${cliente2.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${cliente2.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 4:
                        dia = "Jueves";
                        cliente2.fechaServicio = "Jueves";
                        cliente2.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${cliente2.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${cliente2.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 5:
                        dia = "Viernes";
                        cliente2.fechaServicio = "Viernes";
                        cliente2.servicio = servicio;
                        seguro = 2;
                        alert(`cliente: ${cliente2.nombre}.\nTelefono: ${telefonoCliente}.\nSu servicio es: ${cliente2.servicio}.\n Sera el dia ${dia}.\nGracias por preferirnos`);
                        buscarClientes(nombreCliente,telefonoCliente);
                    case 6:
                        serviciosOfrecer(nombreCliente,telefonoCliente);
                    default:
                        alert("Porfavor, Ingrese una opcion correcta.")
                        fechaServicio(nombreCliente,telefonoCliente,servicio);
                }
            }else{
                fechaServicio(nombreCliente,telefonoCliente,servicio);
            }
        }
        else{
            serviciosOfrecer(nombreCliente,telefonoCliente);
        }
    
}
//inicio del programa
bienvenida();
function bienvenida(){
    const inicio = confirm(saludo);
    if(inicio == true){
        nombreCliente = prompt("Ingrese su nombre: ");
        telefonoCliente = prompt("Ingrese su numero de telefono");
        if(telefonoCliente === ""){
            alert("Ingrese algun telefono")
            bienvenida();
        }
        else if(isNaN(telefonoCliente) === true){
            alert("Ingrese un Telefono Valido");
            bienvenida();
        }else{
            IngresoClientesNuevos(nombreCliente,telefonoCliente);
            buscarClientes(nombreCliente,telefonoCliente);
        }
    }else{
        alert(despedida);
    }
}